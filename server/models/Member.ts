import mongoose, { Schema, Document } from 'mongoose'

export type Domain = 'RPA & AI' | 'Web Dev' | 'App Dev' | 'Design'

export interface IMember extends Document {
  name: string
  linkedinUrl?: string
  githubUrl?: string
  instagramUrl?: string
  domain: Domain
  isLead: boolean
  profileImageUrl: string
  approved: boolean
  createdAt: Date
  updatedAt: Date
}

const memberSchema = new Schema<IMember>(
  {
    name: { type: String, required: true, trim: true },
    linkedinUrl: { type: String, trim: true },
    githubUrl: { type: String, trim: true },
    instagramUrl: { type: String, trim: true },
    domain: {
      type: String,
      enum: ['RPA & AI', 'Web Dev', 'App Dev', 'Design'],
      required: true,
    },
    isLead: { type: Boolean, default: false },
    profileImageUrl: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export const Member = mongoose.model<IMember>('Member', memberSchema)






