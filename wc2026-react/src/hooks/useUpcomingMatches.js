import { useState, useEffect } from 'react'
import { fetchUpcomingMatches } from '../services/espnApi'
import { MATCHES as STATIC_MATCHES } from '../data/matches'

export function useUpcomingMatches(max = 9) {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [fromApi, setFromApi] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchUpcomingMatches(14)
      .then(all => {
        if (cancelled) return
        const upcoming = all.filter(m => m.status.isPre).slice(0, max)
        if (upcoming.length > 0) {
          setMatches(upcoming)
          setFromApi(true)
        } else {
          setMatches(STATIC_MATCHES)
        }
      })
      .catch(() => {
        if (!cancelled) setMatches(STATIC_MATCHES)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [max])

  return { matches, loading, fromApi }
}
