import dotenv from 'dotenv'

dotenv.config()

export const envConfig = {

  server: {
    PORT: process.env.PORT || "5000"
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