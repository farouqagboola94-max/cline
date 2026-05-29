import { useState } from 'react'
import { useStore } from '../store/useStore'
import { MATCHES } from '../data/matches'

function Stepper({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(0, value - 1))}
        className="w-9 h-9 rounded-xl font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 18 }}>−</button>
      <span className="font-mono font-bold text-white text-center" style={{ fontSize: '2.4rem', lineHeight: 1, letterSpacing: '-0.04em', minWidth: 44 }}>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(9, value + 1))}
        className="w-9 h-9 rounded-xl font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 18 }}>+</button>
    </div>
  )
}

function MatchCard({ match }) {
  const { predictions, submitPrediction } = useStore()
  const [home, setHome] = useState(0)
  const [away, setAway] = useState(0)
  const pred   = predictions[match.id]
  const isDone = Boolean(pred)

  return (
    <div className="rounded-2xl overflow-hidden transition-all" style={{ background: '#0e0e0e', border: `1px solid ${isDone ? 'rgba(57,255,20,0.25)' : 'rgba(255,255,255,0.07)'}` }}>
      <div className="px-5 py-3 flex items-center justify-between border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <span className="font-mono font-bold uppercase text-neon-blue" style={{ fontSize: 10, letterSpacing: '0.14em' }}>
          Group {match.group}{match.label && <span className="ml-2 text-gray-600">· {match.label}</span>}
        </span>
        {isDone && <span className="font-mono font-bold uppercase text-neon-green" style={{ fontSize: 10, letterSpacing: '0.12em' }}>✓ LOCKED IN</span>}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          <div className="flex-1 flex flex-col items-center gap-2 text-center">
            <span style={{ fontSize: 40 }}>{match.home.flag}</span>
            <div>
              <div className="font-black leading-tight" style={{ fontSize: 15 }}>{match.home.name}</div>
              <div className="font-mono text-gray-600 mt-0.5" style={{ fontSize: 10 }}>#{match.home.rank}</div>
            </div>
          </div>

          <div className="flex items-center gap-1 px-1">
            {isDone ? (
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-neon-green" style={{ fontSize: '2.8rem', lineHeight: 1 }}>{pred.home}</span>
                <span className="font-mono text-gray-700" style={{ fontSize: '1.8rem' }}>—</span>
                <span className="font-mono font-bold text-neon-green" style={{ fontSize: '2.8rem', lineHeight: 1 }}>{pred.away}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Stepper value={home} onChange={setHome} />
                <span className="font-mono text-gray-700 mx-1" style={{ fontSize: '1.6rem' }}>—</span>
                <Stepper value={away} onChange={setAway} />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col items-center gap-2 text-center">
            <span style={{ fontSize: 40 }}>{match.away.flag}</span>
            <div>
              <div className="font-black leading-tight" style={{ fontSize: 15 }}>{match.away.name}</div>
              <div className="font-mono text-gray-600 mt-0.5" style={{ fontSize: 10 }}>#{match.away.rank}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mt-4 font-mono text-gray-600" style={{ fontSize: 11 }}>
          <span>{match.date}</span><span>·</span><span>{match.time}</span><span>·</span><span>{match.country}</span>
        </div>

        {isDone ? (
          <div className="mt-5 rounded-xl py-3 text-center font-mono font-bold text-neon-green" style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.15)', fontSize: 13 }}>
            Prediction locked. Pray it lands. ⚽
          </div>
        ) : (
          <button onClick={() => submitPrediction(match.id, home, away)} className="btn-neon w-full mt-5 rounded-xl" style={{ fontSize: 13, padding: '12px 16px' }}>
            Lock in {match.home.name} {home}–{away} {match.away.name}
          </button>
        )}
      </div>
    </div>
  )
}

const SCORING = [
  { pts: '+25 pts', label: 'Exact Score',             emoji: '🏆' },
  { pts: '+10 pts', label: 'Correct Winner / Draw',   emoji: '✅' },
  { pts: '+5 pts',  label: 'Correct Goal Difference', emoji: '📊' },
]

export default function PredictionEngine() {
  return (
    <section id="predict" className="py-24 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="absolute top-0 right-0 pointer-events-none" style={{ width: 600, height: 600, background: 'radial-gradient(ellipse, rgba(0,180,255,0.05) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-pill text-neon-blue bg-neon-blue-dim mb-4" style={{ border: '1px solid rgba(0,180,255,0.2)' }}>🎯 Score Predictions</span>
          <h2 className="font-black tracking-tight leading-none mb-3" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            THE PREDICTION<br /><span className="text-gray-600">ENGINE</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto" style={{ fontSize: 15 }}>
            Predict exact scores. Earn points. Climb the board.
            Or suffer in silence like the rest of us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {MATCHES.map((match) => <MatchCard key={match.id} match={match} />)}
        </div>

        <div className="mt-10 rounded-xl p-6" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 className="font-mono font-bold uppercase text-gray-600 mb-4" style={{ fontSize: 10, letterSpacing: '0.14em' }}>How Points Work</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SCORING.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span style={{ fontSize: 24 }}>{s.emoji}</span>
                <div>
                  <div className="font-mono font-bold text-neon-blue" style={{ fontSize: 13 }}>{s.pts}</div>
                  <div className="text-gray-500" style={{ fontSize: 12 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
