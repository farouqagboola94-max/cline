import { useState } from 'react'
import { useStore } from '../store/useStore'
import { BLAME_EVENTS } from '../data/blameEvents'

export default function BlameGame() {
  const [activeIdx, setActiveIdx] = useState(0)
  const { blameVotes, userVotes, castVote } = useStore()

  const event      = BLAME_EVENTS[activeIdx]
  const votes      = blameVotes[event.id] ?? {}
  const userChoice = userVotes[event.id]
  const hasVoted   = userChoice != null
  const total      = Object.values(votes).reduce((a, b) => a + b, 0)
  const getPct     = (id) => (total ? Math.round(((votes[id] ?? 0) / total) * 100) : 0)
  const maxPct     = hasVoted ? Math.max(...event.options.map((o) => getPct(o.id))) : 0

  return (
    <section id="blame" className="py-24 px-6 relative overflow-hidden" style={{ background: '#080808' }}>
      <div className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: 'translate(-50%,-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(255,45,85,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-pill text-neon-red bg-neon-red-dim mb-4" style={{ border: '1px solid rgba(255,45,85,0.25)' }}>
            😂 Fan Democracy
          </span>
          <h2 className="font-black tracking-tight leading-none mb-3" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            THE BLAME<br /><span className="text-gray-600">GAME</span>
          </h2>
          <p className="text-gray-500" style={{ fontSize: 15 }}>
            Something ridiculous happened. Science demands an explanation.
            Democracy will provide it.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {BLAME_EVENTS.map((e, i) => (
            <button
              key={e.id}
              onClick={() => setActiveIdx(i)}
              className="font-mono font-bold uppercase rounded-lg transition-all"
              style={{
                fontSize: 10, letterSpacing: '0.14em', padding: '6px 14px',
                background: i === activeIdx ? 'rgba(255,45,85,0.12)' : 'transparent',
                border: `1px solid ${i === activeIdx ? 'rgba(255,45,85,0.45)' : 'rgba(255,255,255,0.08)'}`,
                color: i === activeIdx ? '#ff2d55' : '#555',
              }}
            >
              #{i + 1}
            </button>
          ))}
        </div>

        {/* Card */}
        <div key={event.id} className="rounded-2xl overflow-hidden" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="px-6 py-4 border-b" style={{ background: 'rgba(255,45,85,0.08)', borderColor: 'rgba(255,45,85,0.2)' }}>
            <div className="font-mono font-bold uppercase text-neon-red mb-1.5" style={{ fontSize: 10, letterSpacing: '0.14em' }}>{event.match}</div>
            <h3 className="font-bold text-white leading-snug" style={{ fontSize: 17 }}>{event.scenario}</h3>
          </div>

          <div className="px-6 py-6">
            <p className="font-mono uppercase text-gray-500 mb-5" style={{ fontSize: 11, letterSpacing: '0.14em' }}>{event.question}</p>

            <div className="flex flex-col gap-3">
              {event.options.map((opt) => {
                const pct      = getPct(opt.id)
                const isChosen = userChoice === opt.id
                const isWinner = hasVoted && pct === maxPct

                return (
                  <button
                    key={opt.id}
                    onClick={() => !hasVoted && castVote(event.id, opt.id)}
                    disabled={hasVoted}
                    className="relative w-full text-left rounded-xl overflow-hidden transition-all"
                    style={{
                      background: isChosen ? 'rgba(255,45,85,0.1)' : hasVoted ? 'rgba(255,255,255,0.02)' : '#141414',
                      border: `1px solid ${isChosen ? 'rgba(255,45,85,0.5)' : hasVoted ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`,
                      cursor: hasVoted ? 'default' : 'pointer',
                    }}
                  >
                    {hasVoted && (
                      <div className="absolute inset-y-0 left-0 transition-all duration-700 rounded-xl" style={{
                        width: `${pct}%`,
                        background: isWinner ? 'rgba(255,45,85,0.1)' : 'rgba(255,255,255,0.025)',
                      }} />
                    )}
                    <div className="relative flex items-center gap-3 px-4 py-3.5">
                      <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                      <span className="flex-1 text-gray-200" style={{ fontSize: 14 }}>{opt.text}</span>
                      {hasVoted && (
                        <span className="font-mono font-bold flex-shrink-0" style={{ fontSize: 13, color: isWinner ? '#ff2d55' : '#555' }}>{pct}%</span>
                      )}
                      {isChosen && <span className="text-neon-red font-bold text-lg flex-shrink-0">✓</span>}
                    </div>
                    {hasVoted && (
                      <div className="px-4 pb-3">
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: isWinner ? 'linear-gradient(90deg,#ff2d55,#ff6b00)' : 'rgba(255,255,255,0.15)' }} />
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {hasVoted
              ? <p className="text-center text-gray-600 font-mono mt-5" style={{ fontSize: 11 }}>{total.toLocaleString()} fans voted · the jury has spoken (permanently)</p>
              : <p className="text-center text-gray-700 font-mono mt-5" style={{ fontSize: 11 }}>Click to vote · you cannot change your answer</p>
            }
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={() => setActiveIdx((p) => Math.max(0, p - 1))} disabled={activeIdx === 0} className="btn-ghost" style={{ borderColor: 'rgba(255,45,85,0.3)', color: '#ff2d55', fontSize: 13, padding: '9px 18px' }}>
            ← Prev Disaster
          </button>
          <span className="font-mono text-gray-600" style={{ fontSize: 12 }}>{activeIdx + 1} / {BLAME_EVENTS.length}</span>
          <button onClick={() => setActiveIdx((p) => Math.min(BLAME_EVENTS.length - 1, p + 1))} disabled={activeIdx === BLAME_EVENTS.length - 1} className="btn-ghost" style={{ borderColor: 'rgba(255,45,85,0.3)', color: '#ff2d55', fontSize: 13, padding: '9px 18px' }}>
            Next Disaster →
          </button>
        </div>
      </div>
    </section>
  )
}
