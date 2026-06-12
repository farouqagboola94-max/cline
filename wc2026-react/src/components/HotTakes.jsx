import { useStore } from '../store/useStore'
import { HOT_TAKES } from '../data/hotTakes'

export default function HotTakes() {
  const { hotTakeVotes, userHotTakes, voteHotTake } = useStore()

  return (
    <section id="hottakes" className="py-24 px-6 relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      <div className="absolute top-0 left-1/2 pointer-events-none" style={{
        transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(255,45,85,0.04) 0%, transparent 65%)',
        filter: 'blur(60px)',
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-pill text-neon-red bg-neon-red-dim mb-4"
            style={{ border: '1px solid rgba(255,45,85,0.25)' }}>
            ⚡ Fan Opinion
          </span>
          <h2 className="font-black tracking-tight leading-none mb-3"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            HOT TAKES<br /><span className="text-gray-600">RAPID FIRE</span>
          </h2>
          <p className="text-gray-500" style={{ fontSize: 15 }}>
            6 questions. No overthinking. Vote and watch the community reveal itself.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {HOT_TAKES.map((take) => {
            const stored   = hotTakeVotes[take.id]
            const votesA   = stored?.a ?? take.seed.a
            const votesB   = stored?.b ?? take.seed.b
            const total    = votesA + votesB
            const userPick = userHotTakes[take.id]
            const hasVoted = userPick != null
            const pctA     = total ? Math.round((votesA / total) * 100) : 50
            const pctB     = 100 - pctA

            return (
              <div key={take.id} className="rounded-2xl overflow-hidden"
                style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="px-5 pt-5 pb-4">
                  <div className="font-bold text-white mb-4 leading-snug" style={{ fontSize: 15 }}>
                    {take.question}
                  </div>

                  <div className="flex flex-col gap-2">
                    {[
                      { key: 'a', label: take.a, pct: pctA, isWinner: pctA >= pctB },
                      { key: 'b', label: take.b, pct: pctB, isWinner: pctB > pctA },
                    ].map(({ key, label, pct, isWinner }) => {
                      const isChosen = userPick === key
                      return (
                        <button
                          key={key}
                          onClick={() => !hasVoted && voteHotTake(take.id, key)}
                          disabled={hasVoted}
                          className="relative w-full text-left rounded-xl overflow-hidden transition-all"
                          style={{
                            background: isChosen
                              ? 'rgba(255,45,85,0.1)'
                              : hasVoted ? 'rgba(255,255,255,0.02)' : '#141414',
                            border: `1px solid ${isChosen
                              ? 'rgba(255,45,85,0.5)'
                              : hasVoted ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`,
                            cursor: hasVoted ? 'default' : 'pointer',
                          }}
                        >
                          {hasVoted && (
                            <div className="absolute inset-y-0 left-0 transition-all duration-700 rounded-xl"
                              style={{
                                width: `${pct}%`,
                                background: isWinner ? 'rgba(255,45,85,0.12)' : 'rgba(255,255,255,0.03)',
                              }}
                            />
                          )}
                          <div className="relative flex items-center justify-between px-4 py-3 gap-3">
                            <span className="text-gray-200 flex-1" style={{ fontSize: 14 }}>{label}</span>
                            {hasVoted && (
                              <span className="font-mono font-bold flex-shrink-0"
                                style={{ fontSize: 13, color: isWinner ? '#ff2d55' : '#555' }}>
                                {pct}%
                              </span>
                            )}
                            {isChosen && <span className="text-neon-red font-bold flex-shrink-0">✓</span>}
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-3 text-center font-mono text-gray-700" style={{ fontSize: 10 }}>
                    {hasVoted
                      ? `${total.toLocaleString()} fans have spoken`
                      : 'Tap to vote · results reveal instantly'}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
