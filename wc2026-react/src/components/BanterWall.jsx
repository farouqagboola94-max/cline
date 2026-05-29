import { useState, useRef } from 'react'
import { useStore } from '../store/useStore'

const REACTIONS = [
  { key: 'fire',  emoji: '🔥' },
  { key: 'skull', emoji: '💀' },
  { key: 'cry',   emoji: '😭' },
]

function MessageCard({ msg, onReact }) {
  return (
    <article
      className="flex gap-3 p-4 rounded-xl transition-all"
      style={{
        background: msg.isNew ? 'rgba(255,107,0,0.05)' : '#0e0e0e',
        border: `1px solid ${msg.isNew ? 'rgba(255,107,0,0.2)' : 'rgba(255,255,255,0.05)'}`,
        animation: msg.isNew ? 'slideIn 0.35s ease-out' : undefined,
      }}
    >
      <span className="text-2xl flex-shrink-0 leading-none pt-0.5">{msg.flag}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="font-bold text-gray-300" style={{ fontSize: 12 }}>{msg.user}</span>
          <span className="font-mono text-gray-600" style={{ fontSize: 10 }}>{msg.time}</span>
        </div>
        <p className="text-gray-200 leading-relaxed break-words" style={{ fontSize: 14 }}>{msg.text}</p>
        <div className="flex items-center gap-2 mt-3">
          {REACTIONS.map(({ key, emoji }) => (
            <button
              key={key}
              onClick={() => onReact(msg.id, key)}
              className="flex items-center gap-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', padding: '4px 10px', fontSize: 12 }}
            >
              <span>{emoji}</span>
              <span className="font-mono text-gray-400">{msg.reactions[key]}</span>
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function BanterWall() {
  const { messages, postMessage, reactToMessage } = useStore()
  const [input, setInput]   = useState('')
  const [flashing, setFlash] = useState(false)
  const inputRef             = useRef(null)
  const MAX = 180

  function handlePost(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    postMessage(text)
    setInput('')
    setFlash(true)
    setTimeout(() => setFlash(false), 700)
    inputRef.current?.focus()
  }

  return (
    <section id="banter" className="py-24 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="absolute top-0 left-1/2 pointer-events-none" style={{ transform: 'translateX(-50%)', width: 700, height: 320, background: 'radial-gradient(ellipse, rgba(255,107,0,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="mb-10">
          <span className="section-pill text-neon-orange bg-neon-orange-dim mb-4" style={{ border: '1px solid rgba(255,107,0,0.25)' }}>
            🔥 Live Fan Banter
          </span>
          <h2 className="font-black tracking-tight leading-none mb-3" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            THE BANTER<br /><span className="text-gray-600">WALL</span>
          </h2>
          <p className="text-gray-500 max-w-md" style={{ fontSize: 15 }}>
            Raw. Unfiltered. Ridiculous. Drop your take and let the world decide
            if you're a genius or a liability.
          </p>
        </div>

        <form onSubmit={handlePost} className="mb-8">
          <div className="flex gap-2 p-1 rounded-xl transition-all" style={{
            background: '#111',
            border: `1px solid ${flashing ? 'rgba(255,107,0,0.5)' : 'rgba(255,255,255,0.07)'}`,
          }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={MAX}
              placeholder="Drop your take. 180 chars. No mercy."
              className="flex-1 bg-transparent text-white placeholder-gray-600 outline-none px-4 py-3"
              style={{ fontSize: 14 }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn-neon shrink-0 rounded-lg"
              style={{ background: flashing ? '#39ff14' : '#ff6b00', color: '#000', fontSize: 13, padding: '10px 18px', borderRadius: 10 }}
            >
              {flashing ? '⚡ Posted!' : 'Drop It'}
            </button>
          </div>
          <div className="flex justify-between mt-1.5 px-1">
            <span className="font-mono text-gray-600" style={{ fontSize: 11 }}>Your flag is random. Embrace anonymity.</span>
            <span className="font-mono" style={{ fontSize: 11, color: input.length > 160 ? '#ff2d55' : '#444' }}>
              {input.length}/{MAX}
            </span>
          </div>
        </form>

        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} onReact={reactToMessage} />
          ))}
        </div>
      </div>
    </section>
  )
}
