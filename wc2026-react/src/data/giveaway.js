export const PRIZES = [
  {
    tier: 'GRAND',
    icon: '🏆',
    label: 'Grand Prize',
    description: 'Official WC2026 Final Match Ticket + Full Replica Kit Bundle',
    winners: 1,
    color: '#ffd700',
    colorDim: 'rgba(255,215,0,0.07)',
    colorBorder: 'rgba(255,215,0,0.3)',
  },
  {
    tier: 'SILVER',
    icon: '⚽',
    label: 'Runner-Up Prize',
    description: 'Adidas WC2026 Official Match Ball + Premium Fan Pack',
    winners: 3,
    color: '#00b4ff',
    colorDim: 'rgba(0,180,255,0.06)',
    colorBorder: 'rgba(0,180,255,0.2)',
  },
  {
    tier: 'BRONZE',
    icon: '🎽',
    label: 'Fan Prize',
    description: 'Exclusive MatchdayMatrix Jersey + Digital Prediction Badge',
    winners: 10,
    color: '#ff6b00',
    colorDim: 'rgba(255,107,0,0.06)',
    colorBorder: 'rgba(255,107,0,0.2)',
  },
]

export const ENTRY_TASKS = [
  { id: 'banter',     label: 'Post on the Banter Wall',      entries: 1, icon: '🔥', cta: '#banter' },
  { id: 'blame',      label: 'Vote in the Blame Game',       entries: 1, icon: '😂', cta: '#blame' },
  { id: 'prediction', label: 'Submit a Score Prediction',    entries: 2, icon: '🎯', cta: '#predict' },
  { id: 'daily',      label: 'Complete the Daily Challenge', entries: 2, icon: '⚡', cta: '#daily' },
  { id: 'share',      label: 'Share MatchdayMatrix',         entries: 3, icon: '🚀', cta: '#share' },
]

export const TOTAL_POSSIBLE_ENTRIES = ENTRY_TASKS.reduce((s, t) => s + t.entries, 0)

export const DRAW_DATE = new Date('2026-07-19T22:00:00Z')
