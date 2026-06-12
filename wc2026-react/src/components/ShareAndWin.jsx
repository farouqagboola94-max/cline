import { useState } from 'react'
import { useStore } from '../store/useStore'
import { MATCHES } from '../data/matches'

const SITE_URL = 'https://wc2026-matchday-matrix.netlify.app'

function buildShareText(predictions) {
  const lines = MATCHES
    .filter((m) => predictions[m.id])
    .map((m) => `${m.home.flag} ${m.home.name} ${predictions[m.id].home}–${predictions[m.id].away} ${m.away.name} ${m.away.flag}`)
  if (!lines.length) return null
  return `⚽ My #WC2026 Predictions:\n${lines.join('\n')}\n\nBeat me at: ${SITE_URL}\n#MatchdayMatrix`
}

const TOP_SHARERS = [
  { name: 'LagosBaller_94',   flag: '🇳🇬', refs: 47 },
  { name: 'El_Pibe_Digital',  flag: '🇦🇷', refs: 38 },
  { name: 'SambaOrDie',       flag: '🇧🇷', refs: 31 },
  { name: 'PenaltyMissQueen', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', refs: 24 },
  { name: 'VARConspiracy',    flag: '🇮🇹', refs: 19 },
]

export default function ShareAndWin() {
  const { predictions, completedTasks, awardGiveawayTask } = useStore()
  const [copied,  setCopied]  = useState(false)
  const [claimed, setClaimed] = useState(false)

  const shareText      = buildShareText(predictions)
  const hasPredictions = shareText != null
  const alreadyShared  = completedTasks['share']

  function handleCopy() {
    const text = shareText
      ?? `Calling every WC2026 pundit — MatchdayMatrix is LIVE. Predict, vote, banter. ${SITE_URL} #WC2026`
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  function handleClaim() {
    awardGiveawayTask('share')
    setClaimed(true)
  }

  const twitterText  = encodeURIComponent(
    shareText ?? `The WC2026 Digital Stadium is LIVE. Predict scores, vote on chaos, win prizes. ${SITE_URL} #WC2026 #MatchdayMatrix`
  )
  const whatsappText = encodeURIComponent(
    shareText ?? `Check out WC2026 MatchdayMatrix — predictions, votes, giveaways! ${SITE_URL}`
  )

  return (
    <section id="share" className="py-24 px-6 relative overflow-hidden" style={{ background: '#080808' }}>
      <div className="absolute bottom-0 right-0 pointer-events-none" style={{
        width: 600, height: 500,
        background: 'radial-gradient(ellipse, rgba(57,255,20,0.04) 0%, transparent 65%)',
        filter: 'blur(80px)',
      }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-pill text-neon-green bg-neon-green-dim mb-4"
            style={{ border: '1px solid rgba(57,255,20,0.2)' }}>
            🚀 Share & Win
          </span>
          <h2 className="font-black tracking-tight leading-none mb-3"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}>
            SPREAD THE<br /><span className="text-gray-600">WORD</span>
          </h2>
          <p className="text-gray-500 max-w-md mx-auto" style={{ fontSize: 15 }}>
            Share your predictions. Flex on your mates. Earn 3 bonus giveaway entries.
            Everyone wins — except your rivals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <div className="font-mono uppercase text-gray-600 mb-3" style={{ fontSize: 10, letterSpacing: '0.14em' }}>
              Your Prediction Card
            </div>
            <div className="rounded-2xl p-5" style={{ background: '#0e0e0e', border: '1px solid rgba(0,180,255,0.2)' }}>
              <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="font-black text-neon-blue tracking-tight" style={{ fontSize: 13 }}>MATCHDAY</span>
                <span className="text-gray-700" style={{ fontSize: 11 }}>✕</span>
                <span className="font-mono font-bold text-neon-orange" style={{ fontSize: 11 }}>MATRIX</span>
                <span className="ml-auto font-mono text-gray-700" style={{ fontSize: 9 }}>WC2026</span>
              </div>
              {hasPredictions ? (
                <div className="flex flex-col gap-2">
                  {MATCHES.filter((m) => predictions[m.id]).map((m) => (
                    <div key={m.id} className="flex items-center gap-2" style={{ fontSize: 13 }}>
                      <span>{m.home.flag}</span>
                      <span className="flex-1 truncate text-gray-400" style={{ fontSize: 12 }}>{m.home.name}</span>
                      <span className="font-mono font-bold text-white">{predictions[m.id].home}–{predictions[m.id].away}</span>
                      <span className="flex-1 text-right truncate text-gray-400" style={{ fontSize: 12 }}>{m.away.name}</span>
                      <span>{m.away.flag}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <div className="text-gray-600" style={{ fontSize: 13 }}>No predictions yet.</div>
                  <a href="#predict" className="text-neon-blue font-medium" style={{ fontSize: 13 }}>Predict now →</a>
                </div>
              )}
              <div className="mt-4 pt-3 text-center text-gray-700 font-mono"
                style={{ fontSize: 9, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                {SITE_URL} · #WC2026 #MatchdayMatrix
              </div>
            </div>

            <div className="mt-5 rounded-xl p-4" style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="font-mono uppercase text-gray-600 mb-3" style={{ fontSize: 10, letterSpacing: '0.12em' }}>
                Top Sharers This Week
              </div>
              {TOP_SHARERS.map((s, i) => (
                <div key={s.name} className="flex items-center gap-3 py-1.5">
                  <span className="font-mono text-gray-600 w-4" style={{ fontSize: 11 }}>{i + 1}</span>
                  <span style={{ fontSize: 16 }}>{s.flag}</span>
                  <span className="flex-1 font-medium text-gray-300" style={{ fontSize: 13 }}>{s.name}</span>
                  <span className="font-mono text-neon-green font-bold" style={{ fontSize: 12 }}>{s.refs} refs</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-mono uppercase text-gray-600 mb-1" style={{ fontSize: 10, letterSpacing: '0.14em' }}>Share On</div>

            <a
              href={`https://twitter.com/intent/tweet?text=${twitterText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
            >
              <span className="font-bold text-white" style={{ fontSize: 20, fontFamily: 'serif' }}>𝕏</span>
              <div className="flex-1">
                <div className="font-bold text-white" style={{ fontSize: 14 }}>Twitter / X</div>
                <div className="font-mono text-gray-500" style={{ fontSize: 11 }}>Post predictions to the timeline</div>
              </div>
              <span className="text-gray-600" style={{ fontSize: 14 }}>→</span>
            </a>

            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}
            >
              <span style={{ fontSize: 22 }}>💬</span>
              <div className="flex-1">
                <div className="font-bold text-white" style={{ fontSize: 14 }}>WhatsApp</div>
                <div className="font-mono text-gray-500" style={{ fontSize: 11 }}>Send to the group chat. They need to see this.</div>
              </div>
              <span className="text-gray-600" style={{ fontSize: 14 }}>→</span>
            </a>

            <button
              onClick={handleCopy}
              className="flex items-center gap-4 p-4 rounded-xl transition-all hover:-translate-y-0.5 w-full text-left"
              style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 22 }}>{copied ? '✅' : '📋'}</span>
              <div className="flex-1">
                <div className="font-bold text-white" style={{ fontSize: 14 }}>{copied ? 'Copied!' : 'Copy Text'}</div>
                <div className="font-mono text-gray-500" style={{ fontSize: 11 }}>Paste to Instagram, TikTok, Discord — anywhere</div>
              </div>
            </button>

            <div className="rounded-xl p-5 mt-1" style={{
              background: (alreadyShared || claimed) ? 'rgba(57,255,20,0.05)' : 'rgba(255,215,0,0.06)',
              border: `1px solid ${(alreadyShared || claimed) ? 'rgba(57,255,20,0.2)' : 'rgba(255,215,0,0.3)'}`,
            }}>
              {(alreadyShared || claimed) ? (
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 28 }}>✅</span>
                  <div>
                    <div className="font-bold text-neon-green" style={{ fontSize: 15 }}>+3 Entries Claimed!</div>
                    <div className="font-mono text-gray-500 mt-0.5" style={{ fontSize: 11 }}>Thanks for spreading the word</div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="font-bold text-neon-yellow mb-1" style={{ fontSize: 15 }}>🏆 Claim 3 Giveaway Entries</div>
                  <div className="font-mono text-gray-500 mb-4" style={{ fontSize: 11 }}>
                    Share on any platform above, then confirm below.
                  </div>
                  <button
                    onClick={handleClaim}
                    className="w-full rounded-xl py-3 font-bold text-black transition-all hover:-translate-y-0.5"
                    style={{ background: 'linear-gradient(90deg, #ffd700, #ff6b00)', fontSize: 14 }}
                  >
                    I Shared It — Claim My Entries →
                  </button>
                </>
              )}
            </div>
            <p className="font-mono text-gray-700 text-center" style={{ fontSize: 10 }}>
              Self-reported · one claim per user · entries added immediately
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
