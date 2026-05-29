import { useState, useEffect } from 'react'

const TICKER = [
  '🔴 LIVE: France 2–1 Norway — 67\'',
  '⚡ GROUP OF DEATH confirmed — Group I is criminally unfair',
  '🏆 WC2026 kicks off June 11 — Estadio Azteca — Mexico City',
  '🇦🇷 Argentina defend. 48 nations want their trophy back.',
  '📊 Haaland: 0 World Cup goals. That changes in 2026.',
  '🚨 England fans already pre-writing penalty miss apologies',
  '🌍 9 African nations qualified — biggest African presence ever',
  '⚽ 104 matches across USA · Mexico · Canada — 40 days of chaos',
]

const NAV_LINKS = [
  { href: '#banter',      label: '🔥 Banter Wall' },
  { href: '#blame',       label: '😂 Blame Game' },
  { href: '#predict',     label: '🎯 Predict' },
  { href: '#leaderboard', label: '🏆 Leaderboard' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Ticker ── */}
      <div className="h-8 overflow-hidden flex items-center" style={{ background: '#00b4ff' }}>
        <div className="flex whitespace-nowrap" style={{ animation: 'ticker 40s linear infinite' }}>
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="font-mono font-semibold uppercase px-8 text-black" style={{ fontSize: 10, letterSpacing: '0.1em' }}>
              {item}
              <span className="mx-4 opacity-30">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Nav bar ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080808]/96 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 h-[62px] flex items-center gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0">
            <span className="font-black text-[15px] text-neon-blue tracking-tight">MATCHDAY</span>
            <span className="text-[#333] text-[13px]">✕</span>
            <span className="font-mono font-bold text-[13px] text-neon-orange">MATRIX</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} className="text-[13px] font-medium text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.05] transition-all">
                {label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 font-mono font-bold text-[10px] tracking-widest uppercase text-[#ff2d55]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff2d55] animate-pulse" />
              LIVE
            </div>
            <a href="#predict" className="btn-neon" style={{ fontSize: 13, padding: '8px 18px', borderRadius: 10 }}>Join the Chaos</a>
          </div>

          {/* Hamburger */}
          <button className="md:hidden ml-auto flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            <span className={`block w-[20px] h-0.5 bg-gray-400 rounded transition-all ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-[20px] h-0.5 bg-gray-400 rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-[20px] h-0.5 bg-gray-400 rounded transition-all ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-white/[0.05] px-5 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white py-2.5 text-[14px] border-b border-white/[0.04] last:border-0">
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  )
}
