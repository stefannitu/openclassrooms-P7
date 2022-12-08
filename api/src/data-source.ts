import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { UserProfile } from './Entity/User'

//if .env file is notprovided we work with default values from config file.
import { POSTGRES_CONNECTION } from './config/db'

export const AppDataSource = new DataSource({
  ...POSTGRES_CONNECTION,
  type: 'postgres',
  synchronize: false,
  logging: false,
  cache: {
    type: 'ioredis',
    options: {
      host: 'localhost',
      port: 6379,
    },
  },
  entities: [__dirname + '/Entity/*'],
  migrations: [__dirname + '/migrations/*'],
  subscribers: [],
})
