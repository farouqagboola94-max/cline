import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { PRIZES, ENTRY_TASKS, TOTAL_POSSIBLE_ENTRIES, DRAW_DATE } from '../data/giveaway'

function pad(n) { return String(n).padStart(2, '0') }

function getCountdown() {
  const diff = DRAW_DATE - Date.now()
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

export default function GiveawayZone() {
  const { completedTasks, giveawayEntries } = useStore()
  const [countdown, setCountdown]       = useState(getCountdown())
  const [communityTotal, setCommunity]  = useState(48201)

  useEffect(() => {
    const t1 = setInterval(() => setCountdown(getCountdown()), 1000)
    const t2 = setInterval(() => setCommunity((n) => n + Math.floor(Math.random() * 3)), 3800)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])

  const pct = Math.round((giveawayEntries / TOTAL_POSSIBLE_ENTRIES) * 100)

  return (
    <section id="giveaway" className="py-24 px-6 relative overflow-hidden" style={{ background: '#06060a' }}>
      <div className="absolute top-0 right-0 pointer-events-none" style={{
        width: 700, height: 600,
        background: 'radial-gradient(ellipse, rgba(255,215,0,0.06) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-pill text-neon-yellow bg-neon-yellow-dim mb-4"
            style={{ border: '1px solid rgba(255,215,0,0.3)' }}>
            🏆 Live Giveaway
          </span>
          <h2 className="font-black tracking-tight leading-none mb-3"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            WIN WC2026<br /><span className="text-gray-600">PRIZES</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto" style={{ fontSize: 15 }}>
            Engage, predict, vote, share. Every action earns giveaway entries.
            Draw goes live on Final day — July 19.
          </p>
        </div>

        <div className="rounded-2xl mb-10 p-6 text-center" style={{
          background: '#0e0e0e',
          border: '1px solid rgba(255,215,0,0.18)',
        }}>
          <div className="font-mono uppercase text-gray-600 mb-5" style={{ fontSize: 11, letterSpacing: '0.14em' }}>
            Draw closes in
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[['DAYS', countdown.d], ['HRS', countdown.h], ['MIN', countdown.m], ['SEC', countdown.s]].map(([label, val]) => (
              <div key={label} className="text-center min-w-[60px]">
                <div className="font-mono font-black text-neon-yellow"
                  style={{ fontSize: 'clamp(2.4rem,7vw,4rem)', lineHeight: 1 }}>
                  {pad(val)}
                </div>
                <div className="font-mono text-gray-600 mt-1" style={{ fontSize: 9, letterSpacing: '0.2em' }}>{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-5 font-mono text-gray-600" style={{ fontSize: 11 }}>
            Community entries so far:{' '}
            <span className="text-neon-yellow font-bold">{communityTotal.toLocaleString()}</span> and counting
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PRIZES.map((prize) => (
            <div key={prize.tier} className="rounded-2xl p-6 text-center" style={{
              background: prize.colorDim,
              border: `1px solid ${prize.colorBorder}`,
            }}>
              <div style={{ fontSize: 44 }}>{prize.icon}</div>
              <div className="font-mono font-bold uppercase mt-2 mb-1"
                style={{ fontSize: 10, color: prize.color, letterSpacing: '0.14em' }}>
                {prize.label}
              </div>
              <div className="font-bold text-white mb-2" style={{ fontSize: 14 }}>{prize.description}</div>
              <div className="font-mono text-gray-500" style={{ fontSize: 11 }}>
                {prize.winners} winner{prize.winners > 1 ? 's' : ''}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl p-6" style={{
            background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <h4 className="font-mono font-bold uppercase text-gray-600 mb-5"
              style={{ fontSize: 10, letterSpacing: '0.14em' }}>
              How to earn entries
            </h4>
            <div className="flex flex-col gap-3">
              {ENTRY_TASKS.map((task) => {
                const done = completedTasks[task.id]
                return (
                  <a
                    key={task.id}
                    href={task.cta}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all"
                    style={{
                      background: done ? 'rgba(57,255,20,0.04)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${done ? 'rgba(57,255,20,0.18)' : 'rgba(255,255,255,0.06)'}`,
                      textDecoration: 'none',
                      pointerEvents: done ? 'none' : undefined,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{task.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-white" style={{ fontSize: 14 }}>{task.label}</div>
                      <div className="font-mono text-gray-600 mt-0.5" style={{ fontSize: 11 }}>
                        +{task.entries} entr{task.entries > 1 ? 'ies' : 'y'}
                      </div>
                    </div>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                      style={{
                        background: done ? '#39ff14' : 'rgba(255,255,255,0.05)',
                        border: done ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        color: done ? '#000' : '#555',
                        fontSize: done ? 11 : 12,
                      }}
                    >
                      {done ? '✓' : '→'}
                    </div>
                  </a>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl p-6 flex flex-col items-center justify-center text-center" style={{
            background: 'rgba(255,215,0,0.04)',
            border: '1px solid rgba(255,215,0,0.22)',
          }}>
            <div className="font-mono uppercase text-neon-yellow mb-2"
              style={{ fontSize: 10, letterSpacing: '0.14em' }}>Your Entries</div>
            <div className="font-black" style={{ fontSize: 80, lineHeight: 1, color: '#ffd700' }}>
              {giveawayEntries}
            </div>
            <div className="text-gray-500 mb-5" style={{ fontSize: 13 }}>of {TOTAL_POSSIBLE_ENTRIES} possible</div>
            <div className="w-full h-2 rounded-full overflow-hidden mb-4" style={{ background: 'rgba(255,255,255,0.07)' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #ffd700, #ff6b00)' }}
              />
            </div>
            <div className="font-mono text-gray-600" style={{ fontSize: 10 }}>
              {pct}% complete
              {TOTAL_POSSIBLE_ENTRIES - giveawayEntries > 0
                ? ` · ${TOTAL_POSSIBLE_ENTRIES - giveawayEntries} left to earn`
                : ' · 🎉 Max entries reached!'}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-700 font-mono mt-6" style={{ fontSize: 10 }}>
          Draw held live July 19 · Winners notified within 48h · No purchase necessary · Open worldwide
        </p>
      </div>
    </section>
  )
}
