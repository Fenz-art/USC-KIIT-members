import { Router } from 'express'
import { approveMember, createMember, getApprovedMembers, getPendingMembers } from '../controllers/membersController'

const router = Router()

router.post('/', createMember)
router.get('/', getApprovedMembers)
router.get('/pending', getPendingMembers)
router.patch('/:id/approve', approveMember)

export default router


