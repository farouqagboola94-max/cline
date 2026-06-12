import { useState, useEffect } from 'react'
import { fetchMatchSummary, extractLineups, extractStats, extractEvents } from '../services/espnApi'

export function useMatchSummary(eventId) {
  const [data,    setData]    = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!eventId) return
    let cancelled = false
    setLoading(true)
    setData(null)

    fetchMatchSummary(eventId)
      .then(json => {
        if (cancelled) return
        setData({
          lineups: extractLineups(json),
          stats:   extractStats(json),
          events:  extractEvents(json),
        })
      })
      .catch(() => {
        if (!cancelled) setData(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [eventId])

  return { data, loading }
}
