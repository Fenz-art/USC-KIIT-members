import type { Member } from '../../types/member'

interface Props {
  member: Member
}

export function MemberCard({ member }: Props) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm">
      {member.isLead && (
        <span className="absolute left-3 top-3 rounded-full bg-uscRed px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
          Lead
        </span>
      )}
      <div className="flex items-center gap-4">
        <img
          src={member.profileImageUrl}
          alt={member.name}
          className="h-16 w-16 rounded-full object-cover ring-2 ring-uscGold/70"
        />
        <div>
          <p className="text-sm font-semibold text-slate-100">{member.name}</p>
          <p className="text-xs text-slate-400">{member.domain}</p>
          <div className="mt-2 flex gap-2 text-xs text-slate-300">
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-uscGold"
              >
                LinkedIn
              </a>
            )}
            {member.githubUrl && (
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-uscGold"
              >
                GitHub
              </a>
            )}
            {member.instagramUrl && (
              <a
                href={member.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-uscGold"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}






