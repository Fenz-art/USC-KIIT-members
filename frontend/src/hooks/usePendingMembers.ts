import { useState, useEffect } from 'react'
import { api } from '../lib/api'
import type { Member } from '../types/member'

export function usePendingMembers() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPendingMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await api<Member[]>('/api/members/pending')
      setMembers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pending members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPendingMembers()
  }, [])

  const approveMember = async (id: string) => {
    try {
      await api(`/api/members/${id}/approve`, {
        method: 'PATCH',
      })
      // Remove approved member from list
      setMembers((prev) => prev.filter((m) => m._id !== id))
    } catch (err) {
      throw err
    }
  }

  return {
    members,
    loading,
    error,
    approveMember,
    refetch: fetchPendingMembers,
  }
}


