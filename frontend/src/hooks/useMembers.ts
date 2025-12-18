import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import type { Member } from '../types/member'

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    api<Member[]>('/api/members')
      .then((data) => {
        if (!cancelled) setMembers(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message ?? 'Failed to load members')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { members, loading, error }
}






