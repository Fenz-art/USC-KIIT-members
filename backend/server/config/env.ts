import * as dotenv from 'dotenv'

dotenv.config()

const required = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required env var: ${key}`)
  }
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT) || 5000,
  mongoUri: required(process.env.MONGO_URI, 'MONGO_URI'),
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  cloudinaryCloudName: required(process.env.CLOUDINARY_CLOUD_NAME, 'CLOUDINARY_CLOUD_NAME'),
  cloudinaryApiKey: required(process.env.CLOUDINARY_API_KEY, 'CLOUDINARY_API_KEY'),
  cloudinaryApiSecret: required(process.env.CLOUDINARY_API_SECRET, 'CLOUDINARY_API_SECRET'),
}


