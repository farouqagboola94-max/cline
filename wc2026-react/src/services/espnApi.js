const BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world'

// FIFA team abbreviation → flag emoji
export const FLAG_MAP = {
  FRA: '🇫🇷', NOR: '🇳🇴', ARG: '🇦🇷', ALG: '🇩🇿', BRA: '🇧🇷', MAR: '🇲🇦',
  USA: '🇺🇸', COL: '🇨🇴', ENG: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', GHA: '🇬🇭', BEL: '🇧🇪', EGY: '🇪🇬',
  GER: '🇩🇪', ESP: '🇪🇸', POR: '🇵🇹', MEX: '🇲🇽', CAN: '🇨🇦', ITA: '🇮🇹',
  NED: '🇳🇱', URU: '🇺🇾', ECU: '🇪🇨', SEN: '🇸🇳', NGA: '🇳🇬', JPN: '🇯🇵',
  KOR: '🇰🇷', AUS: '🇦🇺', CRO: '🇭🇷', SUI: '🇨🇭', SRB: '🇷🇸', DEN: '🇩🇰',
  AUT: '🇦🇹', TUR: '🇹🇷', POL: '🇵🇱', UKR: '🇺🇦', CZE: '🇨🇿', GRE: '🇬🇷',
  HUN: '🇭🇺', SVK: '🇸🇰', ROU: '🇷🇴', ALB: '🇦🇱', SVN: '🇸🇮', GEO: '🇬🇪',
  VEN: '🇻🇪', PAR: '🇵🇾', BOL: '🇧🇴', CHL: '🇨🇱', PER: '🇵🇪', HON: '🇭🇳',
  CRC: '🇨🇷', SLV: '🇸🇻', JAM: '🇯🇲', PAN: '🇵🇦', CUB: '🇨🇺', HAI: '🇭🇹',
  CIV: '🇨🇮', CMR: '🇨🇲', ZAF: '🇿🇦', RSA: '🇿🇦', COD: '🇨🇩', TUN: '🇹🇳',
  IRN: '🇮🇷', KSA: '🇸🇦', IRQ: '🇮🇶', UZB: '🇺🇿', CHN: '🇨🇳', JOR: '🇯🇴',
  NZL: '🇳🇿', QAT: '🇶🇦', UAE: '🇦🇪', OMA: '🇴🇲', BIH: '🇧🇦',
  MNE: '🇲🇪', MKD: '🇲🇰', KOS: '🇽🇰', ISL: '🇮🇸', WAL: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', SCO: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  IRL: '🇮🇪', NIR: '🇬🇧', FIN: '🇫🇮', SWE: '🇸🇪',
}

export function getFlag(code) {
  return FLAG_MAP[code] ?? '🏳️'
}

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/New_York',
  })
}

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: '2-digit', timeZone: 'America/New_York',
  }) + ' ET'
}

export function normalizeMatch(event) {
  const comp = event.competitions?.[0]
  if (!comp) return null
  const homeC = comp.competitors?.find(c => c.homeAway === 'home')
  const awayC = comp.competitors?.find(c => c.homeAway === 'away')
  if (!homeC || !awayC) return null

  const statusType = event.status?.type
  const state = statusType?.state ?? 'pre'
  const isLive  = state === 'in'
  const isFinal = state === 'post'
  const isPre   = state === 'pre'

  const scorers = (comp.details ?? [])
    .filter(d => ['Goal', 'Penalty - Goal', 'Own Goal'].includes(d.type?.text))
    .map(d => ({
      player: d.athletesInvolved?.[0]?.shortName ?? d.athletesInvolved?.[0]?.fullName ?? '',
      minute: d.clock?.displayValue ?? '',
      teamId: d.team?.id ?? '',
      isOG: d.type?.text === 'Own Goal',
    }))

  return {
    id: event.id,
    group: extractGroup(comp),
    label: null,
    date: fmtDate(event.date),
    time: fmtTime(event.date),
    isoDate: event.date,
    venue: comp.venue?.fullName ?? '',
    city:  comp.venue?.address?.city ?? '',
    country: comp.venue?.address?.country ?? '',
    status: { isLive, isFinal, isPre, clock: event.status?.displayClock ?? '', detail: statusType?.shortDetail ?? '' },
    home: {
      name: homeC.team?.displayName ?? '',
      shortName: homeC.team?.shortDisplayName ?? homeC.team?.displayName ?? '',
      code: homeC.team?.abbreviation ?? '',
      flag: getFlag(homeC.team?.abbreviation),
      logo: homeC.team?.logo ?? '',
      score: (isLive || isFinal) ? parseInt(homeC.score ?? '0', 10) : null,
      rank: null,
    },
    away: {
      name: awayC.team?.displayName ?? '',
      shortName: awayC.team?.shortDisplayName ?? awayC.team?.displayName ?? '',
      code: awayC.team?.abbreviation ?? '',
      flag: getFlag(awayC.team?.abbreviation),
      logo: awayC.team?.logo ?? '',
      score: (isLive || isFinal) ? parseInt(awayC.score ?? '0', 10) : null,
      rank: null,
    },
    scorers,
    homeTeamId: homeC.team?.id ?? '',
    awayTeamId: awayC.team?.id ?? '',
  }
}

function extractGroup(comp) {
  const note = comp.notes?.[0]?.headline ?? ''
  const m = note.match(/Group ([A-Z])/i)
  return m?.[1] ?? ''
}

function yyyymmdd(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}${m}${d}`
}

export async function fetchScoreboard(dateStr) {
  const url = dateStr ? `${BASE}/scoreboard?dates=${dateStr}` : `${BASE}/scoreboard`
  const r = await fetch(url, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(`ESPN ${r.status}`)
  const json = await r.json()
  return (json.events ?? []).map(normalizeMatch).filter(Boolean)
}

export async function fetchUpcomingMatches(daysAhead = 12) {
  const today = new Date()
  const end   = new Date(today)
  end.setDate(end.getDate() + daysAhead)
  const range = `${yyyymmdd(today)}-${yyyymmdd(end)}`
  const r = await fetch(`${BASE}/scoreboard?dates=${range}&limit=20`, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(`ESPN ${r.status}`)
  const json = await r.json()
  return (json.events ?? []).map(normalizeMatch).filter(Boolean)
}

export async function fetchMatchSummary(eventId) {
  const r = await fetch(`${BASE}/summary?event=${eventId}`, { headers: { Accept: 'application/json' } })
  if (!r.ok) throw new Error(`ESPN ${r.status}`)
  return r.json()
}

export function extractLineups(json) {
  const teams = json?.boxscore?.teams ?? []
  const home  = teams.find(t => t.homeAway === 'home')
  const away  = teams.find(t => t.homeAway === 'away')

  function parseRoster(td) {
    return (td?.roster ?? []).map(r => ({
      name:       r.athlete?.fullName ?? '',
      shortName:  r.athlete?.shortName ?? r.athlete?.fullName?.split(' ').pop() ?? '',
      jersey:     r.athlete?.jersey ?? '',
      position:   r.athlete?.position?.abbreviation ?? '',
      starter:    r.starter ?? false,
      subbedIn:   r.subbedIn ?? false,
      subbedOut:  r.subbedOut ?? false,
    }))
  }

  return { home: parseRoster(home), away: parseRoster(away) }
}

const STAT_KEYS = [
  { key: 'possessionPct',  label: 'Possession',    pct: true  },
  { key: 'shotsTotal',     label: 'Shots',          pct: false },
  { key: 'shotsOnTarget',  label: 'On Target',      pct: false },
  { key: 'cornerKicks',    label: 'Corners',        pct: false },
  { key: 'fouls',          label: 'Fouls',          pct: false },
  { key: 'yellowCards',    label: 'Yellow Cards',   pct: false },
  { key: 'redCards',       label: 'Red Cards',      pct: false },
  { key: 'saves',          label: 'Saves',          pct: false },
  { key: 'offsides',       label: 'Offsides',       pct: false },
]

export function extractStats(json) {
  const teams = json?.boxscore?.teams ?? []
  const home  = teams.find(t => t.homeAway === 'home')
  const away  = teams.find(t => t.homeAway === 'away')

  function getStat(td, key) {
    return td?.statistics?.find(s => s.name === key)?.displayValue ?? null
  }

  return STAT_KEYS
    .map(({ key, label, pct }) => {
      const h = getStat(home, key)
      const a = getStat(away, key)
      if (h === null && a === null) return null
      return { label, home: h ?? '0', away: a ?? '0', pct }
    })
    .filter(Boolean)
}

const EVENT_TYPES = {
  '68': { label: 'Goal',         icon: '⚽' },
  '69': { label: 'Penalty Goal', icon: '⚽' },
  '70': { label: 'Yellow Card',  icon: '🟨' },
  '71': { label: 'Red Card',     icon: '🟥' },
  '72': { label: 'Substitution', icon: '🔄' },
  '93': { label: 'Own Goal',     icon: '⚽' },
  '97': { label: 'Penalty Miss', icon: '❌' },
}

export function extractEvents(json) {
  return (json?.plays ?? [])
    .filter(p => EVENT_TYPES[p.type?.id])
    .map(p => ({
      id:     p.id ?? String(Math.random()),
      typeId: p.type?.id ?? '0',
      icon:   EVENT_TYPES[p.type?.id]?.icon ?? '•',
      label:  EVENT_TYPES[p.type?.id]?.label ?? p.type?.text ?? '',
      minute: p.clock?.displayValue ?? '',
      text:   p.text ?? '',
      teamId: p.team?.id ?? '',
    }))
    .reverse()
}
