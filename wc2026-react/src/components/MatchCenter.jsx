import { useState, useEffect } from 'react'
import { useLiveScores } from '../hooks/useLiveScores'
import { useMatchSummary } from '../hooks/useMatchSummary'

function StatusBadge({ status }) {
  if (status.isLive) return (
    <span className="flex items-center gap-1.5 font-mono font-bold" style={{ color: '#ff2d55', fontSize: 10 }}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] animate-pulse" />
      LIVE · {status.clock}
    </span>
  )
  if (status.isFinal) return (
    <span className="font-mono font-bold text-gray-500" style={{ fontSize: 10 }}>FINAL</span>
  )
  return <span className="font-mono text-gray-600" style={{ fontSize: 10 }}>{status.detail}</span>
}

function ScoreCard({ match, isSelected, onClick }) {
  const { isLive, isFinal } = match.status
  const hasScore = isLive || isFinal

  return (
    <button
      onClick={() => onClick(match.id)}
      className="w-full text-left rounded-2xl p-4 transition-all hover:-translate-y-0.5"
      style={{
        background: isSelected ? 'rgba(0,180,255,0.05)' : '#0e0e0e',
        border: `1px solid ${isLive ? 'rgba(255,45,85,0.5)' : isSelected ? 'rgba(0,180,255,0.3)' : 'rgba(255,255,255,0.07)'}`,
        cursor: 'pointer',
        boxShadow: isLive ? '0 0 24px rgba(255,45,85,0.1)' : 'none',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <StatusBadge status={match.status} />
        <span className="font-mono text-gray-700 truncate ml-2 max-w-[140px]" style={{ fontSize: 9 }}>
          {match.venue || match.city}
          {match.group ? ` · Grp ${match.group}` : ''}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <span style={{ fontSize: 22, flexShrink: 0 }}>{match.home.flag}</span>
          <span className="font-bold text-white truncate" style={{ fontSize: 13 }}>{match.home.shortName || match.home.name}</span>
        </div>

        <div className="font-mono font-black text-center flex-shrink-0" style={{ minWidth: 68 }}>
          {hasScore ? (
            <span style={{ fontSize: '1.5rem', color: isLive ? '#ff2d55' : '#fff' }}>
              {match.home.score}–{match.away.score}
            </span>
          ) : (
            <span className="text-gray-500 font-medium" style={{ fontSize: 12 }}>{match.time}</span>
          )}
        </div>

        <div className="flex-1 flex items-center gap-2 justify-end min-w-0">
          <span className="font-bold text-white truncate" style={{ fontSize: 13 }}>{match.away.shortName || match.away.name}</span>
          <span style={{ fontSize: 22, flexShrink: 0 }}>{match.away.flag}</span>
        </div>
      </div>

      {match.scorers.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
          {match.scorers.map((s, i) => (
            <span key={i} className="font-mono text-gray-600" style={{ fontSize: 9 }}>
              ⚽ {s.player} {s.minute}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}

function StatBar({ label, home, away }) {
  const h = parseFloat(String(home).replace('%', '')) || 0
  const a = parseFloat(String(away).replace('%', '')) || 0
  const total = h + a
  const homePct = total > 0 ? (h / total) * 100 : 50

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono font-bold text-neon-blue" style={{ fontSize: 12 }}>{home}</span>
        <span className="text-gray-600" style={{ fontSize: 10 }}>{label}</span>
        <span className="font-mono font-bold text-neon-orange" style={{ fontSize: 12 }}>{away}</span>
      </div>
      <div className="h-1 rounded-full overflow-hidden flex" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ width: `${homePct}%`, background: '#00b4ff', transition: 'width 0.6s ease', borderRadius: '9999px 0 0 9999px' }} />
        <div style={{ flex: 1, background: '#ff6b00', borderRadius: '0 9999px 9999px 0' }} />
      </div>
    </div>
  )
}

function LineupGrid({ lineups, homeTeam, awayTeam }) {
  const hStarters = lineups.home.filter(p => p.starter)
  const aStarters = lineups.away.filter(p => p.starter)
  const hSubs     = lineups.home.filter(p => !p.starter)
  const aSubs     = lineups.away.filter(p => !p.starter)

  function Player({ p, align }) {
    return (
      <div className={`flex items-center gap-1.5 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}>
        <span className="font-mono text-gray-700 w-5 text-center flex-shrink-0" style={{ fontSize: 10 }}>{p.jersey}</span>
        <div className="min-w-0">
          <div className="font-medium text-white truncate" style={{ fontSize: 12 }}>
            {p.shortName || p.name.split(' ').pop()}
            {p.subbedOut && <span className="ml-1 text-neon-orange" style={{ fontSize: 9 }}>↓</span>}
            {p.subbedIn  && <span className="ml-1 text-neon-green"  style={{ fontSize: 9 }}>↑</span>}
          </div>
          <div className="font-mono text-gray-700" style={{ fontSize: 9 }}>{p.position}</div>
        </div>
      </div>
    )
  }

  const rows = Math.max(hStarters.length, aStarters.length)

  return (
    <div>
      <div className="flex items-center justify-between mb-3 pb-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span className="font-bold text-white" style={{ fontSize: 13 }}>{homeTeam.flag} {homeTeam.shortName || homeTeam.name}</span>
        <span className="font-mono text-gray-700 uppercase" style={{ fontSize: 9, letterSpacing: '0.12em' }}>Starting XI</span>
        <span className="font-bold text-white" style={{ fontSize: 13 }}>{awayTeam.shortName || awayTeam.name} {awayTeam.flag}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {Array.from({ length: rows }).map((_, i) => (
          <>
            <div key={`h${i}`}>{hStarters[i] && <Player p={hStarters[i]} align="left" />}</div>
            <div key={`a${i}`}>{aStarters[i] && <Player p={aStarters[i]} align="right" />}</div>
          </>
        ))}
      </div>

      {(hSubs.length > 0 || aSubs.length > 0) && (
        <>
          <div className="font-mono uppercase text-gray-700 mt-4 mb-2" style={{ fontSize: 9, letterSpacing: '0.12em' }}>Substitutes</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            {Array.from({ length: Math.max(hSubs.length, aSubs.length) }).map((_, i) => (
              <>
                <div key={`hs${i}`} className="opacity-50">{hSubs[i] && <Player p={hSubs[i]} align="left" />}</div>
                <div key={`as${i}`} className="opacity-50">{aSubs[i] && <Player p={aSubs[i]} align="right" />}</div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function EventTimeline({ events, homeTeamId }) {
  if (!events.length) return (
    <div className="text-center py-8 text-gray-600" style={{ fontSize: 13 }}>No events yet</div>
  )

  return (
    <div className="flex flex-col gap-2">
      {events.map((ev) => {
        const isHome = ev.teamId === homeTeamId
        return (
          <div key={ev.id} className={`flex items-center gap-3 ${isHome ? '' : 'flex-row-reverse'}`}>
            <span className="font-mono font-bold text-gray-500 w-10 text-center flex-shrink-0" style={{ fontSize: 11 }}>
              {ev.minute}
            </span>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{ev.icon}</span>
            <div className={`flex-1 rounded-xl px-3 py-2 ${isHome ? '' : 'text-right'}`}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="font-medium text-white" style={{ fontSize: 12 }}>{ev.text}</div>
              <div className="font-mono text-gray-600" style={{ fontSize: 10 }}>{ev.label}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function MatchCenter() {
  const { matches, live, loading, error, lastFetch } = useLiveScores(45000)
  const [selectedId, setSelectedId] = useState(null)
  const [activeTab,  setActiveTab]  = useState('events')

  useEffect(() => {
    if (matches.length === 0) return
    const target = live[0] ?? matches[0]
    setSelectedId(prev => prev ?? target?.id ?? null)
  }, [matches, live])

  useEffect(() => {
    const sel = matches.find(m => m.id === selectedId)
    if (sel?.status.isLive) setActiveTab('events')
  }, [selectedId, matches])

  const selectedMatch  = matches.find(m => m.id === selectedId)
  const { data: detail, loading: detailLoading } = useMatchSummary(selectedId)

  const hasDetail  = Boolean(detail)
  const hasLineups = detail?.lineups?.home?.length > 0
  const hasStats   = detail?.stats?.length > 0

  const TABS = [
    { id: 'events',  label: '⚡ Events',  show: true },
    { id: 'stats',   label: '📊 Stats',   show: hasStats  },
    { id: 'lineups', label: '👥 Lineups', show: hasLineups },
  ]

  return (
    <section id="scores" className="py-20 px-6 relative overflow-hidden" style={{ background: '#080808' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none" style={{
        width: 800, height: 500,
        background: 'radial-gradient(ellipse, rgba(255,45,85,0.05) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <span className="section-pill text-neon-red bg-neon-red-dim mb-4"
            style={{ border: '1px solid rgba(255,45,85,0.2)' }}>
            {live.length > 0 ? (
              <><span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] animate-pulse mr-1.5 inline-block" />
              {live.length} MATCH{live.length > 1 ? 'ES' : ''} LIVE</>
            ) : '📺 Match Center'}
          </span>
          <h2 className="font-black tracking-tight leading-none mb-2"
            style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>
            LIVE<br /><span className="text-gray-600">SCORES</span>
          </h2>
          <p className="text-gray-600 font-mono" style={{ fontSize: 11 }}>
            {lastFetch
              ? `Updated ${lastFetch.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })} · Auto-refreshes every 45s`
              : 'Loading real-time data…'}
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-3 font-mono text-gray-600" style={{ fontSize: 13 }}>
              <span className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              Connecting to live data…
            </div>
          </div>
        )}

        {!loading && error && matches.length === 0 && (
          <div className="text-center py-12">
            <div className="font-mono text-gray-600 mb-2" style={{ fontSize: 12 }}>Live data temporarily unavailable</div>
            <div className="text-gray-700 font-mono" style={{ fontSize: 10 }}>{error}</div>
          </div>
        )}

        {!loading && matches.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {matches.map(m => (
                <ScoreCard key={m.id} match={m} isSelected={m.id === selectedId} onClick={setSelectedId} />
              ))}
            </div>

            {selectedMatch && (
              <div className="rounded-2xl overflow-hidden" style={{
                background: '#0e0e0e',
                border: `1px solid ${selectedMatch.status.isLive ? 'rgba(255,45,85,0.3)' : 'rgba(255,255,255,0.07)'}`,
              }}>
                <div className="px-6 py-4 flex flex-wrap items-center gap-4 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span style={{ fontSize: 30 }}>{selectedMatch.home.flag}</span>
                    <div>
                      <div className="font-black text-white" style={{ fontSize: 16 }}>{selectedMatch.home.name}</div>
                      {selectedMatch.home.score !== null && (
                        <div className="font-mono font-black" style={{ fontSize: 28, color: selectedMatch.status.isLive ? '#ff2d55' : '#fff', lineHeight: 1 }}>
                          {selectedMatch.home.score}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-center flex-shrink-0">
                    <StatusBadge status={selectedMatch.status} />
                    {selectedMatch.status.isPre && (
                      <div className="font-mono text-gray-500 mt-1" style={{ fontSize: 11 }}>
                        {selectedMatch.date}<br />{selectedMatch.time}
                      </div>
                    )}
                    <div className="font-mono text-gray-700 mt-1" style={{ fontSize: 9 }}>{selectedMatch.venue}</div>
                  </div>

                  <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                    <div className="text-right">
                      <div className="font-black text-white" style={{ fontSize: 16 }}>{selectedMatch.away.name}</div>
                      {selectedMatch.away.score !== null && (
                        <div className="font-mono font-black text-right" style={{ fontSize: 28, color: selectedMatch.status.isLive ? '#ff2d55' : '#fff', lineHeight: 1 }}>
                          {selectedMatch.away.score}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 30 }}>{selectedMatch.away.flag}</span>
                  </div>
                </div>

                <div className="flex border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                  {TABS.filter(t => t.show).map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className="px-5 py-3 font-mono font-bold transition-all"
                      style={{
                        fontSize: 11,
                        color: activeTab === tab.id ? '#00b4ff' : '#666',
                        borderBottom: `2px solid ${activeTab === tab.id ? '#00b4ff' : 'transparent'}`,
                        background: 'transparent', cursor: 'pointer', letterSpacing: '0.08em',
                      }}>{tab.label}</button>
                  ))}
                </div>

                <div className="p-6">
                  {detailLoading && (
                    <div className="flex items-center justify-center py-8">
                      <span className="font-mono text-gray-600" style={{ fontSize: 12 }}>Loading match data…</span>
                    </div>
                  )}
                  {!detailLoading && !hasDetail && (
                    <div className="text-center py-8">
                      <div className="font-mono text-gray-600" style={{ fontSize: 12 }}>
                        {selectedMatch.status.isPre ? 'Detailed data available closer to kick-off' : 'Match data loading…'}
                      </div>
                    </div>
                  )}
                  {!detailLoading && hasDetail && activeTab === 'events' && (
                    <EventTimeline events={detail.events} homeTeamId={selectedMatch.homeTeamId} />
                  )}
                  {!detailLoading && hasDetail && activeTab === 'stats' && hasStats && (
                    <div className="max-w-lg mx-auto">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-white" style={{ fontSize: 13 }}>{selectedMatch.home.flag} {selectedMatch.home.shortName}</span>
                        <span className="font-mono text-gray-600 uppercase" style={{ fontSize: 9, letterSpacing: '0.12em' }}>Match Stats</span>
                        <span className="font-bold text-white" style={{ fontSize: 13 }}>{selectedMatch.away.shortName} {selectedMatch.away.flag}</span>
                      </div>
                      {detail.stats.map(s => <StatBar key={s.label} {...s} />)}
                    </div>
                  )}
                  {!detailLoading && hasDetail && activeTab === 'lineups' && hasLineups && (
                    <LineupGrid lineups={detail.lineups} homeTeam={selectedMatch.home} awayTeam={selectedMatch.away} />
                  )}
                </div>
              </div>
            )}
          </>
        )}

        {!loading && !error && matches.length === 0 && (
          <div className="text-center py-12 rounded-2xl" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚽</div>
            <div className="font-bold text-white mb-2" style={{ fontSize: 16 }}>No matches today</div>
            <div className="font-mono text-gray-600" style={{ fontSize: 12 }}>WC2026 · 104 matches across 40 days<br />Check back on match days</div>
          </div>
        )}
      </div>
    </section>
  )
}
