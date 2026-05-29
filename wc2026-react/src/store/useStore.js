import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_LEADERBOARD } from '../data/leaderboard'
import { BLAME_EVENTS } from '../data/blameEvents'

const SEED_MESSAGES = [
  { id: 1,  user: 'LagosBaller_94',   flag: '🇳🇬', text: 'France lifting that trophy in July. Screenshot this.',                                              time: '2m ago',  reactions: { fire: 47,  skull: 12,  cry: 3  } },
  { id: 2,  user: 'El_Pibe_Digital',  flag: '🇦🇷', text: 'Anyone picking against Argentina is choosing chaos for themselves 🐐',                               time: '4m ago',  reactions: { fire: 89,  skull: 34,  cry: 7  } },
  { id: 3,  user: 'TikTakTiki',       flag: '🇪🇸', text: 'England fans stay delusional every single World Cup. Respect the consistency, honestly.',             time: '7m ago',  reactions: { fire: 156, skull: 23,  cry: 45 } },
  { id: 4,  user: 'SambaOrDie',       flag: '🇧🇷', text: 'Brazil haven\'t won since 2002. We are suffering together in real time.',                            time: '11m ago', reactions: { fire: 34,  skull: 78,  cry: 123} },
  { id: 5,  user: 'VARConspiracy',    flag: '🇮🇹', text: 'VAR is a psychological weapon designed to test faith. Change my mind.',                              time: '15m ago', reactions: { fire: 201, skull: 45,  cry: 12 } },
  { id: 6,  user: 'OffsideMind_OG',   flag: '🇬🇭', text: 'Ghana making the knockouts. I\'m saying it now. Screenshot this.',                                  time: '20m ago', reactions: { fire: 67,  skull: 89,  cry: 34 } },
  { id: 7,  user: 'PenaltyMissQueen', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', text: 'It\'s coming home. (just not via penalties, obviously)',                                         time: '25m ago', reactions: { fire: 45,  skull: 234, cry: 89 } },
  { id: 8,  user: 'Haaland_Fan_007',  flag: '🇳🇴', text: 'Haaland scoring 8 goals this tournament. I\'m not joking. I\'m never joking about this.',            time: '30m ago', reactions: { fire: 133, skull: 56,  cry: 18 } },
  { id: 9,  user: 'xGLord',           flag: '🇩🇪', text: 'Germany\'s xG at the last World Cup was elite. The finishing was not. Never again.',                 time: '38m ago', reactions: { fire: 78,  skull: 102, cry: 44 } },
  { id: 10, user: 'SofaScientist',    flag: '🇺🇸', text: 'USA hosting a World Cup and not winning it would be the most American thing to ever happen.',         time: '45m ago', reactions: { fire: 334, skull: 67,  cry: 29 } },
]

const ANON_USERS = ['Anonymous_Fan', 'FootballHead', 'MatchdayGhost', 'PitchSide', 'TouchlineTalk', 'NightShiftRef', 'SubBenchPhilosopher', 'OffsideTrap']
const FLAGS = ['🇳🇬', '🇧🇷', '🇦🇷', '🇫🇷', '🇩🇪', '🇪🇸', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇮🇹', '🇲🇽', '🇨🇴', '🇬🇭', '🇲🇦', '🇸🇳', '🇯🇵', '🇰🇷', '🇺🇸', '🇨🇦', '🇳🇴', '🇵🇹']

let msgId = 200

function initBlameVotes() {
  const votes = {}
  BLAME_EVENTS.forEach((e) => { votes[e.id] = { ...e.seed } })
  return votes
}

export const useStore = create(
  persist(
    (set, get) => ({
      // ── Banter Wall ────────────────────────────────────
      messages: SEED_MESSAGES,

      postMessage(text) {
        const msg = {
          id: msgId++,
          user: ANON_USERS[Math.floor(Math.random() * ANON_USERS.length)],
          flag: FLAGS[Math.floor(Math.random() * FLAGS.length)],
          text,
          time: 'just now',
          reactions: { fire: 0, skull: 0, cry: 0 },
          isNew: true,
        }
        set((s) => ({ messages: [msg, ...s.messages].slice(0, 50) }))
      },

      reactToMessage(id, reaction) {
        set((s) => ({
          messages: s.messages.map((m) =>
            m.id === id
              ? { ...m, reactions: { ...m.reactions, [reaction]: m.reactions[reaction] + 1 } }
              : m
          ),
        }))
      },

      // ── Blame Game ─────────────────────────────────────
      blameVotes: initBlameVotes(),
      userVotes: {},

      castVote(eventId, optionId) {
        const { userVotes } = get()
        if (userVotes[eventId]) return
        set((s) => ({
          userVotes: { ...s.userVotes, [eventId]: optionId },
          blameVotes: {
            ...s.blameVotes,
            [eventId]: {
              ...s.blameVotes[eventId],
              [optionId]: (s.blameVotes[eventId]?.[optionId] ?? 0) + 1,
            },
          },
        }))
      },

      // ── Predictions ────────────────────────────────────
      predictions: {},

      submitPrediction(matchId, home, away) {
        set((s) => ({
          predictions: {
            ...s.predictions,
            [matchId]: { home: Number(home), away: Number(away), ts: Date.now() },
          },
        }))
      },

      // ── Leaderboard ────────────────────────────────────
      leaderboard: INITIAL_LEADERBOARD,
    }),
    {
      name: 'wc2026-store',
      partialize: (state) => ({
        userVotes:   state.userVotes,
        blameVotes:  state.blameVotes,
        predictions: state.predictions,
        messages:    state.messages,
      }),
    }
  )
)
