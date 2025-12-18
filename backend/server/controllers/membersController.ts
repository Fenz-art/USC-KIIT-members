import type { Request, Response } from 'express'
import { Member } from '../models/Member'

export const createMember = async (req: Request, res: Response) => {
  try {
    const { name, linkedinUrl, githubUrl, instagramUrl, domain, isLead, profileImageUrl } = req.body

    if (!name || !domain || !profileImageUrl) {
      return res.status(400).json({ message: 'name, domain and profileImageUrl are required' })
    }

    const member = await Member.create({
      name,
      linkedinUrl,
      githubUrl,
      instagramUrl,
      domain,
      isLead: Boolean(isLead),
      profileImageUrl,
      approved: false,
    })

    return res.status(201).json(member)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Create member error', err)
    return res.status(500).json({ message: 'Failed to create member' })
  }
}

export const getApprovedMembers = async (_req: Request, res: Response) => {
  try {
    const members = await Member.find({ approved: true }).sort({ isLead: -1, createdAt: 1 })
    return res.json(members)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Get members error', err)
    return res.status(500).json({ message: 'Failed to fetch members' })
  }
}

export const getPendingMembers = async (_req: Request, res: Response) => {
  try {
    const members = await Member.find({ approved: false }).sort({ createdAt: -1 })
    return res.json(members)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Get pending members error', err)
    return res.status(500).json({ message: 'Failed to fetch pending members' })
  }
}

export const approveMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const member = await Member.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    )

    if (!member) {
      return res.status(404).json({ message: 'Member not found' })
    }

    return res.json(member)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Approve member error', err)
    return res.status(500).json({ message: 'Failed to approve member' })
  }
}





