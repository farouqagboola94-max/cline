import { useState } from 'react'
import { useStore } from '../store/useStore'

const DAILY_MATCH = {
  home: { name: 'France',   flag: '🇫🇷', rank: 2  },
  away: { name: 'Norway',   flag: '🇳🇴', rank: 11 },
  group: 'I',
  date: 'Jun 15',
  time: '18:00',
  country: 'USA',
}

function Stepper({ value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-9 h-9 rounded-xl font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 18 }}
      >−</button>
      <span className="font-mono font-bold text-white text-center"
        style={{ fontSize: '2.4rem', lineHeight: 1, letterSpacing: '-0.04em', minWidth: 44 }}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(9, value + 1))}
        className="w-9 h-9 rounded-xl font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 18 }}
      >+</button>
    </div>
  )
}

export default function DailyChallenge() {
  const { dailyChallengeDone, dailyChallengeEntry, dailyStreak, submitDailyChallenge } = useStore()
  const [home, setHome] = useState(0)
  const [away, setAway] = useState(0)

  return (
    <section id="daily" className="py-16 px-6 relative overflow-hidden" style={{ background: '#070710' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,0,0.07) 0%, transparent 60%)',
      }} />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <span className="section-pill text-neon-orange bg-neon-orange-dim mb-4"
            style={{ border: '1px solid rgba(255,107,0,0.25)' }}>
            ⚡ Daily Challenge
          </span>
          <h2 className="font-black tracking-tight leading-none mb-2"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}>
            TODAY'S MATCH
          </h2>
          {dailyStreak > 0 && (
            <div className="font-mono font-bold text-neon-orange mt-2" style={{ fontSize: 12 }}>
              🔥 {dailyStreak}-day streak · keep it alive
            </div>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{
          background: '#0e0e0e',
          border: `1px solid ${dailyChallengeDone ? 'rgba(57,255,20,0.25)' : 'rgba(255,107,0,0.2)'}`,
        }}>
          <div className="px-5 py-3 flex items-center justify-between border-b"
            style={{ background: 'rgba(255,107,0,0.06)', borderColor: 'rgba(255,107,0,0.15)' }}>
            <span className="font-mono font-bold uppercase text-neon-orange"
              style={{ fontSize: 10, letterSpacing: '0.14em' }}>
              Group {DAILY_MATCH.group} · {DAILY_MATCH.date} · {DAILY_MATCH.time} · {DAILY_MATCH.country}
            </span>
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-neon-yellow" style={{ fontSize: 10 }}>⚡ 2× BONUS POINTS</span>
              {dailyChallengeDone && (
                <span className="font-mono font-bold text-neon-green" style={{ fontSize: 10, letterSpacing: '0.1em' }}>✓ DONE</span>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 flex flex-col items-center gap-2 text-center">
                <span style={{ fontSize: 44 }}>{DAILY_MATCH.home.flag}</span>
                <div className="font-black leading-tight" style={{ fontSize: 16 }}>{DAILY_MATCH.home.name}</div>
                <div className="font-mono text-gray-600" style={{ fontSize: 10 }}>#{DAILY_MATCH.home.rank}</div>
              </div>

              <div className="flex items-center gap-1 px-1">
                {dailyChallengeDone ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-neon-green" style={{ fontSize: '2.8rem', lineHeight: 1 }}>{dailyChallengeEntry.home}</span>
                    <span className="font-mono text-gray-700" style={{ fontSize: '1.8rem' }}>—</span>
                    <span className="font-mono font-bold text-neon-green" style={{ fontSize: '2.8rem', lineHeight: 1 }}>{dailyChallengeEntry.away}</span>
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
                <span style={{ fontSize: 44 }}>{DAILY_MATCH.away.flag}</span>
                <div className="font-black leading-tight" style={{ fontSize: 16 }}>{DAILY_MATCH.away.name}</div>
                <div className="font-mono text-gray-600" style={{ fontSize: 10 }}>#{DAILY_MATCH.away.rank}</div>
              </div>
            </div>

            {dailyChallengeDone ? (
              <div className="rounded-xl py-3 text-center font-mono font-bold text-neon-green"
                style={{ background: 'rgba(57,255,20,0.06)', border: '1px solid rgba(57,255,20,0.15)', fontSize: 13 }}>
                🏆 Prediction locked · +2 Giveaway Entries Earned · Results after KO
              </div>
            ) : (
              <>
                <button
                  onClick={() => submitDailyChallenge(home, away)}
                  className="w-full rounded-xl font-bold text-black transition-all hover:-translate-y-0.5 active:translate-y-0"
                  style={{ background: 'linear-gradient(90deg, #ff6b00, #ffd700)', fontSize: 14, padding: '13px 16px' }}
                >
                  ⚡ Lock in Daily Prediction (+2 Entries)
                </button>
                <p className="text-center font-mono text-gray-600 mt-3" style={{ fontSize: 11 }}>
                  First submission only · Double points awarded on the leaderboard
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
