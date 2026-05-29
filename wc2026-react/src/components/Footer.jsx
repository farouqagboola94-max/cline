const LINKS = [
  { href: '#banter',      label: '🔥 Banter Wall' },
  { href: '#blame',       label: '😂 Blame Game' },
  { href: '#predict',     label: '🎯 Predictions' },
  { href: '#leaderboard', label: '🏆 Leaderboard' },
]

export default function Footer() {
  return (
    <footer className="border-t py-16 px-6" style={{ background: '#050505', borderColor: 'rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-black text-neon-blue text-xl tracking-tight">MATCHDAY</span>
              <span className="text-gray-700 text-sm">✕</span>
              <span className="font-mono font-bold text-neon-orange">MATRIX</span>
            </div>
            <p className="text-gray-600 max-w-xs leading-relaxed mb-5" style={{ fontSize: 14 }}>
              The digital stadium for the 2026 World Cup. Built for fans who
              think too hard about football and suffer deeply for it.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Twitter/X', 'Instagram', 'TikTok', 'Substack'].map((s) => (
                <button key={s} className="text-gray-600 hover:text-gray-300 transition-colors font-medium" style={{ fontSize: 13 }}>{s}</button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono font-bold uppercase text-gray-600 mb-4" style={{ fontSize: 10, letterSpacing: '0.14em' }}>Navigate</h4>
            <div className="flex flex-col gap-3">
              {LINKS.map(({ href, label }) => (
                <a key={href} href={href} className="text-gray-500 hover:text-white transition-colors" style={{ fontSize: 14 }}>{label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono font-bold uppercase text-gray-600 mb-4" style={{ fontSize: 10, letterSpacing: '0.14em' }}>WC2026</h4>
            <div className="flex flex-col gap-3 text-gray-600" style={{ fontSize: 13 }}>
              {['🗓️ June 11 – July 19, 2026', '🏟️ 16 Venues · 3 Countries', '🌎 USA · Mexico · Canada', '⚽ 48 Teams · 104 Matches', '🏆 Biggest World Cup ever'].map((f) => (
                <div key={f}>{f}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t pt-6 flex items-center justify-between flex-wrap gap-3" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <p className="font-mono text-gray-700" style={{ fontSize: 11 }}>© 2026 MatchdayMatrix × OffsideMind · All rights reserved</p>
          <p className="font-mono text-gray-800" style={{ fontSize: 11 }}>Built for the chaos · Built for the beautiful game</p>
        </div>
      </div>
    </footer>
  )
}
