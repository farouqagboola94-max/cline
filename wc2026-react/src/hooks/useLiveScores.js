import { useState, useEffect, useCallback } from 'react'
import { fetchScoreboard } from '../services/espnApi'

export function useLiveScores(pollMs = 45000) {
  const [matches,   setMatches]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState(null)
  const [lastFetch, setLastFetch] = useState(null)

  const load = useCallback(async () => {
    try {
      const data = await fetchScoreboard()
      setMatches(data)
      setError(null)
      setLastFetch(new Date())
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, pollMs)
    return () => clearInterval(id)
  }, [load, pollMs])

  const live     = matches.filter(m => m.status.isLive)
  const finished = matches.filter(m => m.status.isFinal)
  const upcoming = matches.filter(m => m.status.isPre)

  return { matches, live, finished, upcoming, loading, error, lastFetch, reload: load }
}
