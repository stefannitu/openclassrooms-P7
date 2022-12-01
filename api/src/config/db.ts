import * as dotenv from 'dotenv'
dotenv.config()
import { PostgresConnectionCredentialsOptions } from 'typeorm/driver/postgres/PostgresConnectionCredentialsOptions'
//if .env file is not provided we are working with default values

const {
  POSTGRES_USER = 'ocUser',
  POSTGRES_PASSWORD = 'ocPassword',
  POSTGRES_DB = 'groupomania',
  POSTGRES_HOST = 'localhost',
  POSTGRES_PORT = 5432,
} = process.env

export const POSTGRES_CONNECTION: PostgresConnectionCredentialsOptions = {
  host: POSTGRES_HOST,
  port: +POSTGRES_PORT,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
}
