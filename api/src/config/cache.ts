import { RedisStoreOptions } from 'connect-redis'

const { REDIS_PORT = 6379, REDIS_HOST = 'localhost' } = process.env

export const REDIS_OPTIONS: RedisStoreOptions = {
  host: REDIS_HOST,
  port: +REDIS_PORT,
}
