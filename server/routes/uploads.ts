import { Router } from 'express'
import { upload } from '../config/multer'
import { uploadAvatar } from '../controllers/uploadsController'

const router = Router()

router.post('/avatar', upload.single('file'), uploadAvatar)

export default router






