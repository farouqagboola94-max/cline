#!/usr/bin/env node
/**
 * Higgsfield AI MCP Server
 *
 * Exposes image and video generation from Higgsfield AI as Cline tools.
 *
 * Setup in your MCP config (~/.cline/mcp_settings.json):
 *   {
 *     "mcpServers": {
 *       "higgsfield": {
 *         "command": "node",
 *         "args": ["/path/to/higgsfield-mcp/dist/server.js"],
 *         "env": { "HIGGSFIELD_API_KEY": "your-api-key" }
 *       }
 *     }
 *   }
 *
 * Get your API key at: https://higgsfield.ai
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE = "https://api.higgsfield.ai/v1";
const API_KEY = process.env.HIGGSFIELD_API_KEY ?? "";

const IMAGE_POLL_INTERVAL_MS = 2000;
const VIDEO_POLL_INTERVAL_MS = 5000;
const IMAGE_TIMEOUT_MS = 120_000;
const VIDEO_TIMEOUT_MS = 300_000;

function authHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
}

async function submitAndPoll(
  endpoint: string,
  payload: unknown,
  pollIntervalMs: number,
  timeoutMs: number
): Promise<Record<string, unknown>> {
  const submitRes = await fetch(`${API_BASE}/${endpoint}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });

  if (!submitRes.ok) {
    const text = await submitRes.text();
    throw new Error(`Higgsfield API error ${submitRes.status}: ${text}`);
  }

  const initial = (await submitRes.json()) as Record<string, unknown>;
  const jobId = (initial.id ?? initial.job_id) as string | undefined;

  if (!jobId) {
    return initial;
  }

  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, pollIntervalMs));

    const pollRes = await fetch(`${API_BASE}/generations/${jobId}`, {
      headers: authHeaders(),
    });
    const data = (await pollRes.json()) as Record<string, unknown>;
    const status = data.status as string;

    if (["completed", "done", "success"].includes(status)) {
      return data;
    }
    if (["failed", "error", "cancelled"].includes(status)) {
      throw new Error(
        `Higgsfield generation failed: ${(data.error as string) ?? "Unknown error"}`
      );
    }
  }

  throw new Error(`Higgsfield generation timed out after ${timeoutMs / 1000}s`);
}

function extractOutputUrl(result: Record<string, unknown>): string {
  for (const key of ["outputs", "medias", "results", "images", "videos"]) {
    const items = result[key] as unknown[] | undefined;
    if (items?.length) {
      const item = items[0];
      if (typeof item === "string") return item;
      if (typeof item === "object" && item !== null) {
        const m = item as Record<string, string>;
        const url = m.url ?? m.download_url ?? m.src ?? "";
        if (url) return url;
      }
    }
  }
  if (typeof result.url === "string") return result.url;
  throw new Error(
    `Could not find output URL in Higgsfield response: ${JSON.stringify(result)}`
  );
}

const TOOLS: Tool[] = [
  {
    name: "higgsfield_generate_image",
    description:
      "Generate an image from a text prompt using Higgsfield AI. " +
      "Returns the URL of the generated image. " +
      "Models: soul_2 (portraits/fashion/UGC), recraft_v4_1 (illustrations/logos/vectors), " +
      "soul_location (environments/backgrounds), nano_banana_pro (4K/text/diagrams).",
    inputSchema: {
      type: "object" as const,
      required: ["prompt"],
      properties: {
        prompt: {
          type: "string",
          description: "Text description of the image to generate",
        },
        model: {
          type: "string",
          enum: ["soul_2", "recraft_v4_1", "soul_location", "nano_banana_pro"],
          default: "soul_2",
          description: "Higgsfield image model to use",
        },
        aspect_ratio: {
          type: "string",
          enum: ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3"],
          default: "1:1",
          description: "Output aspect ratio",
        },
      },
    },
  },
  {
    name: "higgsfield_generate_video",
    description:
      "Generate a video from a text prompt using Higgsfield AI. " +
      "Returns the URL of the generated video. " +
      "Models: kling3_0_turbo (fast), kling3_0 (cinematic/audio), seedance_2_0 (identity-consistent).",
    inputSchema: {
      type: "object" as const,
      required: ["prompt"],
      properties: {
        prompt: {
          type: "string",
          description: "Text description of the video to generate",
        },
        model: {
          type: "string",
          enum: ["kling3_0_turbo", "kling3_0", "seedance_2_0"],
          default: "kling3_0_turbo",
          description: "Higgsfield video model to use",
        },
        aspect_ratio: {
          type: "string",
          enum: ["16:9", "9:16", "1:1"],
          default: "16:9",
          description: "Output aspect ratio",
        },
        duration: {
          type: "number",
          enum: [3, 5, 10],
          default: 5,
          description: "Video duration in seconds",
        },
      },
    },
  },
  {
    name: "higgsfield_animate_image",
    description:
      "Animate a start-frame image URL into a video using Higgsfield AI. " +
      "Pass a publicly accessible image URL. Returns the generated video URL.",
    inputSchema: {
      type: "object" as const,
      required: ["image_url"],
      properties: {
        image_url: {
          type: "string",
          description: "Publicly accessible URL of the start-frame image",
        },
        prompt: {
          type: "string",
          default: "",
          description: "Optional prompt to guide the animation",
        },
        model: {
          type: "string",
          enum: ["kling3_0_turbo", "kling3_0", "seedance_2_0"],
          default: "kling3_0_turbo",
        },
        aspect_ratio: {
          type: "string",
          enum: ["16:9", "9:16", "1:1"],
          default: "16:9",
        },
        duration: {
          type: "number",
          enum: [3, 5, 10],
          default: 5,
        },
      },
    },
  },
];

async function handleGenerateImage(args: Record<string, unknown>) {
  if (!API_KEY) throw new Error("HIGGSFIELD_API_KEY environment variable is not set");
  const payload = {
    model: args.model ?? "soul_2",
    prompt: args.prompt,
    params: { aspect_ratio: args.aspect_ratio ?? "1:1", count: 1 },
  };
  const result = await submitAndPoll(
    "generations/image",
    payload,
    IMAGE_POLL_INTERVAL_MS,
    IMAGE_TIMEOUT_MS
  );
  const url = extractOutputUrl(result);
  return { url, message: `Image generated successfully: ${url}` };
}

async function handleGenerateVideo(args: Record<string, unknown>) {
  if (!API_KEY) throw new Error("HIGGSFIELD_API_KEY environment variable is not set");
  const payload = {
    model: args.model ?? "kling3_0_turbo",
    prompt: args.prompt,
    params: {
      aspect_ratio: args.aspect_ratio ?? "16:9",
      duration: args.duration ?? 5,
    },
  };
  const result = await submitAndPoll(
    "generations/video",
    payload,
    VIDEO_POLL_INTERVAL_MS,
    VIDEO_TIMEOUT_MS
  );
  const url = extractOutputUrl(result);
  return { url, message: `Video generated successfully: ${url}` };
}

async function handleAnimateImage(args: Record<string, unknown>) {
  if (!API_KEY) throw new Error("HIGGSFIELD_API_KEY environment variable is not set");
  if (!args.image_url) throw new Error("image_url is required");
  const payload = {
    model: args.model ?? "kling3_0_turbo",
    prompt: args.prompt ?? "",
    params: {
      aspect_ratio: args.aspect_ratio ?? "16:9",
      duration: args.duration ?? 5,
    },
    medias: [{ role: "start_image", value: args.image_url }],
  };
  const result = await submitAndPoll(
    "generations/video",
    payload,
    VIDEO_POLL_INTERVAL_MS,
    VIDEO_TIMEOUT_MS
  );
  const url = extractOutputUrl(result);
  return { url, message: `Animated video generated successfully: ${url}` };
}

const server = new Server(
  { name: "higgsfield-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;
  const a = args as Record<string, unknown>;

  try {
    let result: unknown;
    if (name === "higgsfield_generate_image") {
      result = await handleGenerateImage(a);
    } else if (name === "higgsfield_generate_video") {
      result = await handleGenerateVideo(a);
    } else if (name === "higgsfield_animate_image") {
      result = await handleAnimateImage(a);
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${(err as Error).message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
