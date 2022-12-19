import * as dotenv from 'dotenv'
dotenv.config()

//if .env file is not provided we are working with default values
const {
  POSTGRES_USER = 'ocUser',
  POSTGRES_PASSWORD = 'ocPassword',
  POSTGRES_DB = 'groupomania',
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = 5432,
} = process.env

export const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`
