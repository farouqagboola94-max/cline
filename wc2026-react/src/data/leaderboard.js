export const RANKS = [
  { min: 1000, title: 'Tactical Genius',    color: 'text-neon-yellow', icon: '🧠' },
  { min: 800,  title: 'The Oracle',         color: 'text-neon-blue',   icon: '🔮' },
  { min: 600,  title: 'Sharp Analyst',      color: 'text-neon-green',  icon: '📊' },
  { min: 400,  title: 'Decent Pundit',      color: 'text-white',       icon: '📝' },
  { min: 250,  title: 'Weekend Warrior',    color: 'text-gray-400',    icon: '⚽' },
  { min: 100,  title: 'Lucky Guesser',      color: 'text-gray-500',    icon: '🍀' },
  { min: 0,    title: 'Blind Sofa Manager', color: 'text-gray-600',    icon: '🛋️' },
]

export const getRank = (points) =>
  RANKS.find((r) => points >= r.min) ?? RANKS[RANKS.length - 1]

export const INITIAL_LEADERBOARD = [
  { id: 1,  username: 'LagosBaller_94',    flag: '🇳🇬', points: 1240, streak: 7, predictions: 32 },
  { id: 2,  username: 'El_Pibe_Digital',   flag: '🇦🇷', points: 1180, streak: 5, predictions: 30 },
  { id: 3,  username: 'TikTakTiki',        flag: '🇪🇸', points: 1055, streak: 4, predictions: 28 },
  { id: 4,  username: 'PenaltyMissQueen',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', points: 980,  streak: 3, predictions: 31 },
  { id: 5,  username: 'SambaOrDie',        flag: '🇧🇷', points: 920,  streak: 6, predictions: 29 },
  { id: 6,  username: 'OffsideMind_OG',    flag: '🇬🇭', points: 870,  streak: 2, predictions: 27 },
  { id: 7,  username: 'Haaland_Fan_007',   flag: '🇳🇴', points: 795,  streak: 4, predictions: 25 },
  { id: 8,  username: 'VARConspiracy',     flag: '🇮🇹', points: 720,  streak: 1, predictions: 28 },
  { id: 9,  username: 'xGLord',            flag: '🇩🇪', points: 650,  streak: 0, predictions: 24 },
  { id: 10, username: 'SofaScientist',     flag: '🇺🇸', points: 580,  streak: 2, predictions: 22 },
  { id: 11, username: 'PressureKicks',     flag: '🇫🇷', points: 430,  streak: 1, predictions: 20 },
  { id: 12, username: 'CookingWithPepe',   flag: '🇵🇹', points: 310,  streak: 0, predictions: 18 },
  { id: 13, username: 'TacticalBedlam',    flag: '🇲🇦', points: 220,  streak: 1, predictions: 16 },
  { id: 14, username: 'HighLineHeresy',    flag: '🇨🇦', points: 145,  streak: 0, predictions: 14 },
  { id: 15, username: 'RulesAreOptional',  flag: '🇲🇽', points: 75,   streak: 0, predictions: 12 },
]
