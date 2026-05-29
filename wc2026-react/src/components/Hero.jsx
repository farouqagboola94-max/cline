import { useState, useEffect } from 'react'

const KICKOFF = new Date('2026-06-11T20:00:00-06:00')

function pad(n) { return String(n).padStart(2, '0') }

function getCountdown() {
  const diff = KICKOFF - Date.now()
  if (diff <= 0) return { d: '00', h: '00', m: '00', s: '00' }
  return {
    d: pad(Math.floor(diff / 86400000)),
    h: pad(Math.floor((diff % 86400000) / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  }
}

const STATS = [
  { num: '48',  label: 'Nations' },
  { num: '104', label: 'Matches' },
  { num: '16',  label: 'Venues' },
  { num: '3',   label: 'Host Countries' },
]

export default function Hero() {
  const [time, setTime] = useState(getCountdown)

  useEffect(() => {
    const id = setInterval(() => setTime(getCountdown()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[#060606]" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background:
          'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(0,180,255,0.1) 0%, transparent 65%),' +
          'radial-gradient(ellipse 55% 45% at 85% 85%, rgba(255,107,0,0.07) 0%, transparent 55%)',
      }} />

      {/* Decorative pitch */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <div className="w-full max-w-5xl aspect-video border border-white rounded-2xl relative">
          <div className="absolute inset-y-0 left-1/2 w-px bg-white" />
          <div className="absolute top-1/2 left-1/2 w-44 h-44 border border-white rounded-full" style={{ transform: 'translate(-50%,-50%)' }} />
          <div className="absolute left-0 top-1/2 w-[22%] h-[55%] border border-white border-l-0" style={{ transform: 'translateY(-50%)' }} />
          <div className="absolute right-0 top-1/2 w-[22%] h-[55%] border border-white border-r-0" style={{ transform: 'translateY(-50%)' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[900px] mx-auto w-full">
        {/* Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          <span className="section-pill text-neon-blue bg-neon-blue-dim" style={{ border: '1px solid rgba(0,180,255,0.2)' }}>
            June 11 — July 19 · 2026
          </span>
          <span className="section-pill text-neon-orange bg-neon-orange-dim" style={{ border: '1px solid rgba(255,107,0,0.2)' }}>
            48 Teams · 104 Matches · 1 Trophy
          </span>
        </div>

        {/* Title */}
        <h1 className="font-black tracking-tight leading-none mb-6" style={{ fontSize: 'clamp(3.2rem,9vw,7.5rem)' }}>
          <span className="block text-gray-200">THE DIGITAL</span>
          <span className="block text-white">STADIUM</span>
          <span className="block font-bold" style={{ fontSize: 'clamp(1.4rem,4vw,3rem)', color: '#333', marginTop: '0.15em' }}>
            IS NOW OPEN
          </span>
        </h1>

        <p className="text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed" style={{ fontSize: 17 }}>
          Predict exact scores. Cast blame. Drop hot takes. The 2026 World Cup
          crosses three nations — your chaos starts here.
        </p>

        {/* Countdown */}
        <div className="inline-block mb-10 backdrop-blur-sm rounded-2xl" style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          padding: '28px 36px',
        }}>
          <p className="font-mono font-semibold uppercase text-neon-orange mb-5" style={{ fontSize: 10, letterSpacing: '0.16em' }}>
            ⚡ Kickoff · Estadio Azteca · Mexico City
          </p>
          <div className="flex items-center justify-center gap-1">
            {[{ val: time.d, label: 'Days' }, { val: time.h, label: 'Hours' }, { val: time.m, label: 'Mins' }, { val: time.s, label: 'Secs' }].map(({ val, label }, i) => (
              <div key={label} className="flex items-center gap-1">
                <div className="text-center" style={{ minWidth: 72 }}>
                  <span className="font-mono font-bold text-white block" style={{ fontSize: 'clamp(2.4rem,5.5vw,4rem)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    {val}
                  </span>
                  <span className="font-mono uppercase text-gray-600 block mt-2" style={{ fontSize: 10, letterSpacing: '0.12em' }}>
                    {label}
                  </span>
                </div>
                {i < 3 && <span className="font-mono font-bold text-gray-700 mb-4" style={{ fontSize: '2rem', lineHeight: 1 }}>:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-14">
          <a href="#predict" className="btn-neon" style={{ fontSize: 14 }}>🎯 Make Your Predictions</a>
          <a href="#banter" className="btn-ghost" style={{ fontSize: 14 }}>🔥 Enter the Banter Wall</a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center flex-wrap">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="px-6 sm:px-10 text-center">
                <div className="font-mono font-bold text-white" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', letterSpacing: '-0.03em' }}>{s.num}</div>
                <div className="text-gray-600 font-medium mt-1" style={{ fontSize: 12 }}>{s.label}</div>
              </div>
              {i < STATS.length - 1 && <div className="w-px h-10 bg-white/[0.07]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 flex flex-col items-center gap-2 text-gray-600 font-mono uppercase animate-bounce"
        style={{ transform: 'translateX(-50%)', fontSize: 9, letterSpacing: '0.14em' }}>
        <div className="w-px h-10 bg-gradient-to-b from-gray-600 to-transparent" />
        Scroll
      </div>
    </section>
  )
}
