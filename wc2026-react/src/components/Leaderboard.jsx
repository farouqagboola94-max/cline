import { useStore } from '../store/useStore'
import { getRank } from '../data/leaderboard'

const MEDALS = { 1: '🥇', 2: '🥈', 3: '🥉' }
const MEDAL_COLORS = { 1: '#ffd700', 2: '#c0c0c0', 3: '#cd7f32' }
const PODIUM_H = { 1: 144, 2: 112, 3: 92 }
const PODIUM_BG = {
  1: { bg: 'rgba(255,215,0,0.08)',   border: 'rgba(255,215,0,0.2)'   },
  2: { bg: 'rgba(192,192,192,0.08)', border: 'rgba(192,192,192,0.2)' },
  3: { bg: 'rgba(205,127,50,0.08)',  border: 'rgba(205,127,50,0.2)'  },
}

function PodiumSlot({ user, podiumRank }) {
  const rank = getRank(user.points)
  const p    = PODIUM_BG[podiumRank]
  return (
    <div className="flex flex-col items-center gap-3">
      <span style={{ fontSize: 32 }}>{user.flag}</span>
      <div className="text-center">
        <div className="font-bold truncate max-w-[110px]" style={{ fontSize: 13 }}>{user.username}</div>
        <div className={`font-mono font-bold mt-0.5 ${rank.color}`} style={{ fontSize: 10 }}>{rank.icon} {rank.title}</div>
        <div className="font-mono font-bold text-white mt-1" style={{ fontSize: 14 }}>{user.points.toLocaleString()} pts</div>
      </div>
      <div className="w-full flex items-center justify-center rounded-t-xl" style={{ height: PODIUM_H[podiumRank], background: p.bg, border: `1px solid ${p.border}` }}>
        <span style={{ fontSize: 36 }}>{MEDALS[podiumRank]}</span>
      </div>
    </div>
  )
}

export default function Leaderboard() {
  const { leaderboard, predictions } = useStore()
  const sorted    = [...leaderboard].sort((a, b) => b.points - a.points)
  const predCount = Object.keys(predictions).length

  return (
    <section id="leaderboard" className="py-24 px-6 relative overflow-hidden" style={{ background: '#080808' }}>
      <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: 700, height: 400, background: 'radial-gradient(ellipse, rgba(255,215,0,0.04) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-pill text-neon-yellow bg-neon-yellow-dim mb-4" style={{ border: '1px solid rgba(255,215,0,0.2)' }}>🏆 Global Rankings</span>
          <h2 className="font-black tracking-tight leading-none mb-3" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>LEADERBOARD</h2>
          <p className="text-gray-500" style={{ fontSize: 15 }}>From Tactical Genius down to Blind Sofa Manager. The community has rendered its verdict.</p>
        </div>

        {/* Podium */}
        <div className="grid grid-cols-3 gap-4 mb-10 items-end">
          {sorted[1] && <PodiumSlot user={sorted[1]} podiumRank={2} />}
          {sorted[0] && <PodiumSlot user={sorted[0]} podiumRank={1} />}
          {sorted[2] && <PodiumSlot user={sorted[2]} podiumRank={3} />}
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="grid px-5 py-3 border-b font-mono font-bold uppercase text-gray-600"
            style={{ gridTemplateColumns: '48px 1fr 120px 72px 72px', gap: 16, fontSize: 10, letterSpacing: '0.12em', background: '#141414', borderColor: 'rgba(255,255,255,0.05)' }}>
            <div>#</div><div>Fan</div><div className="text-right">Rank</div><div className="text-right">Streak</div><div className="text-right">Pts</div>
          </div>

          {sorted.map((user, i) => {
            const pos  = i + 1
            const rank = getRank(user.points)
            return (
              <div key={user.id} className="grid items-center border-b hover:bg-white/[0.015] transition-colors last:border-0"
                style={{ gridTemplateColumns: '48px 1fr 120px 72px 72px', gap: 16, padding: '14px 20px', borderColor: 'rgba(255,255,255,0.04)', background: pos <= 3 ? 'rgba(255,255,255,0.01)' : undefined }}>
                <div className="font-mono font-bold" style={{ fontSize: 14, color: MEDAL_COLORS[pos] ?? '#444' }}>{MEDALS[pos] ?? pos}</div>
                <div className="flex items-center gap-2 min-w-0">
                  <span style={{ fontSize: 20 }}>{user.flag}</span>
                  <div className="min-w-0">
                    <div className="font-bold truncate" style={{ fontSize: 13 }}>{user.username}</div>
                    <div className="font-mono text-gray-600" style={{ fontSize: 10 }}>{user.predictions} predictions</div>
                  </div>
                </div>
                <div className={`text-right font-mono font-bold ${rank.color}`} style={{ fontSize: 11 }}>{rank.icon} {rank.title}</div>
                <div className="text-right font-mono text-gray-400" style={{ fontSize: 13 }}>{user.streak > 0 ? `🔥 ${user.streak}` : '—'}</div>
                <div className="text-right font-mono font-bold text-white" style={{ fontSize: 14 }}>{user.points.toLocaleString()}</div>
              </div>
            )
          })}
        </div>

        {/* Your status */}
        <div className="mt-6 rounded-xl p-5 flex items-center justify-between gap-4 flex-wrap" style={{ background: 'rgba(0,180,255,0.05)', border: '1px solid rgba(0,180,255,0.2)' }}>
          <div>
            <div className="font-mono uppercase text-neon-blue mb-1" style={{ fontSize: 10, letterSpacing: '0.14em' }}>Your Status</div>
            <div className="font-black text-white" style={{ fontSize: 20 }}>
              {predCount > 0 ? `${predCount} prediction${predCount > 1 ? 's' : ''} locked in` : 'No predictions yet — make your move'}
            </div>
          </div>
          <a href="#predict" className="btn-neon shrink-0" style={{ fontSize: 13, padding: '10px 20px', borderRadius: 10 }}>
            {predCount > 0 ? 'Add More →' : 'Start Predicting →'}
          </a>
        </div>
      </div>
    </section>
  )
}
