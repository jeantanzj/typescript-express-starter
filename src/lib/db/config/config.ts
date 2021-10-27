require('module-alias/register')
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

// Config
import config from '@core/config'

// Constants
const DB_USERNAME = config.get('db.username')
const DB_PASSWORD = config.get('db.password')
const DB_HOST = config.get('db.host')
const DB_PORT = config.get('db.port')
const DB_NAME = config.get('db.name')
const DB_DIALECT:
  | 'postgres'
  | 'mysql'
  | 'sqlite'
  | 'mariadb'
  | 'mssql'
  | undefined = 'postgres'
const DB_MIN_POOL_SIZE = config.get('db.minPoolSize')
const DB_MAX_POOL_SIZE = config.get('db.maxPoolSize')

const commonConfig = {
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  dialectOptions: {
    useUTC: false, // for reading from database,
    timezone: '+08:00',
  },
  timezone: '+08:00', // for writing to database,
  define: {
    underscored: true,
    charset: 'utf8',
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_seed_data',
  pool: {
    min: DB_MIN_POOL_SIZE,
    max: DB_MAX_POOL_SIZE,
  },
}

const development = {
  ...commonConfig,
  logging: false,
}

const staging = {
  ...commonConfig,
  logging: false,
}

const production = {
  ...commonConfig,
  logging: false,
}

export { development, staging, production }
