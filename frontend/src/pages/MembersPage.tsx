import { useMemo } from 'react'
import { useMembers } from '../hooks/useMembers'
import { MemberCard } from '../components/members/MemberCard'
import type { Member } from '../types/member'

export function MembersPage() {
  const { members, loading, error } = useMembers()

  const leads = useMemo(
    () => members.filter((m) => m.isLead),
    [members]
  )

  const domains = useMemo(() => {
    const nonLeads = members.filter((m) => !m.isLead)
    const groups: Record<string, Member[]> = {}
    for (const m of nonLeads) {
      if (!groups[m.domain]) groups[m.domain] = []
      groups[m.domain].push(m)
    }
    return groups
  }, [members])

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-50">Members</h1>
          <p className="mt-2 text-sm text-slate-400">
            Only approved members are shown here. Leads appear at the top, followed by members grouped by domain.
          </p>
        </header>

        {loading && (
          <p className="text-sm text-slate-400">Loading members...</p>
        )}
        {error && (
          <p className="text-sm text-red-400">Error loading members: {error}</p>
        )}

        {!loading && !error && (
          <div className="space-y-16">
            {leads.length > 0 && (
              <section>
                <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-widest text-uscGold">
                  Leads
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {leads.map((member) => (
                    <MemberCard key={member._id} member={member} />
                  ))}
                </div>
              </section>
            )}

            {Object.entries(domains).map(([domain, list]) => (
              <section key={domain}>
                <h2 className="mb-8 text-center text-3xl font-bold uppercase tracking-widest text-uscGold">
                  {domain}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {list.map((member) => (
                    <MemberCard key={member._id} member={member} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}






