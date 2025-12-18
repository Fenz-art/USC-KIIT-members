import { useState } from 'react'
import { usePendingMembers } from '../hooks/usePendingMembers'
import type { Member } from '../types/member'

export function AdminPage() {
  const { members, loading, error, approveMember } = usePendingMembers()
  const [approving, setApproving] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleApprove = async (member: Member) => {
    if (!member._id) return

    try {
      setApproving(member._id)
      setSuccessMessage(null)
      await approveMember(member._id)
      setSuccessMessage(`${member.name} has been approved!`)
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (err) {
      alert(`Failed to approve ${member.name}. Please try again.`)
    } finally {
      setApproving(null)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-slate-400">Loading pending members...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 text-red-400">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Review and approve pending member applications</p>
        </div>

        {successMessage && (
          <div className="mb-6 bg-green-900/20 border border-green-500/50 rounded-lg p-4 text-green-400">
            {successMessage}
          </div>
        )}

        {members.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-8 text-center">
            <p className="text-slate-400 text-lg">No pending members to review</p>
            <p className="text-slate-500 text-sm mt-2">All applications have been processed</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member._id}
                className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-4 mb-4">
                  {member.profileImageUrl ? (
                    <img
                      src={member.profileImageUrl}
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-slate-700"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 text-xl font-semibold">
                      {member.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <span className="inline-block px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded">
                      {member.domain}
                    </span>
                    {member.isLead && (
                      <span className="ml-2 inline-block px-2 py-1 bg-yellow-900/30 text-yellow-400 text-xs rounded">
                        Lead
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-slate-400 hover:text-blue-400 truncate"
                    >
                      LinkedIn: {member.linkedinUrl}
                    </a>
                  )}
                  {member.githubUrl && (
                    <a
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-slate-400 hover:text-blue-400 truncate"
                    >
                      GitHub: {member.githubUrl}
                    </a>
                  )}
                  {member.instagramUrl && (
                    <a
                      href={member.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-slate-400 hover:text-blue-400 truncate"
                    >
                      Instagram: {member.instagramUrl}
                    </a>
                  )}
                </div>

                <button
                  onClick={() => handleApprove(member)}
                  disabled={approving === member._id}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {approving === member._id ? 'Approving...' : 'Approve Member'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


