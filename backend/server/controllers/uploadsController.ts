import type { Request, Response } from 'express'
import { cloudinary } from '../config/cloudinary'

export const uploadAvatar = async (req: Request, res: Response) => {
  try {
    const file = req.file
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const base64 = file.buffer.toString('base64')
    const dataUri = `data:${file.mimetype};base64,${base64}`

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: 'usc-kiit-members/avatars',
      transformation: [{ width: 512, height: 512, crop: 'fill', gravity: 'faces' }],
    })

    return res.status(201).json({ url: result.secure_url })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Upload error', err)
    return res.status(500).json({ message: 'Failed to upload image' })
  }
}






