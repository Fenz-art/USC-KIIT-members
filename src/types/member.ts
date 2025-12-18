export type Domain = 'RPA & AI' | 'Web Dev' | 'App Dev' | 'Design'

export interface Member {
  _id: string
  name: string
  linkedinUrl?: string
  githubUrl?: string
  instagramUrl?: string
  domain: Domain
  isLead: boolean
  profileImageUrl: string
  approved: boolean
}






