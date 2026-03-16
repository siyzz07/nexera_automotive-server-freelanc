import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {

  server: {
    PORT: process.env.PORT || "5000"
  },
  cloudinary: {
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'your_cloud_name',
    API_KEY: process.env.CLOUDINARY_API_KEY || 'your_api_key',
    API_SECRET: process.env.CLOUDINARY_API_SECRET || 'your_api_secret',
  },

  dataBase: {
    DATABASE_URL: process.env.DATABASE_URL || ''
  },

  jwt: {
    REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,
    ACCESS_TOKEN_KEY: process.env.JWT_ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_EXPIRY : process.env.REFRESH_TOKEN_EXPIRY,
    ACCESS_TOKEN_EXPIRY : process.env.ACCESS_TOKEN_EXPIRY

  }

}