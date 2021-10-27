// Need to register module alias here too to make db:migrate work
require('module-alias/register')
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

// Config
import config from '@core/config'

import { Sequelize } from 'sequelize-typescript'
import { ApiKey } from '@db/models'
import { development, staging, production } from '@core/db/config/config'
import logger from '@core/logger'
import moment from 'moment-timezone'
moment.tz.setDefault(config.get('tz'))
const sequelizeLoader = async (): Promise<Sequelize> => {
  const env = config.get('env')

  // database, user, password, options
  let sequelize

  if (env === 'production') {
    sequelize = new Sequelize(
      production.database,
      production.username,
      production.password,
      production
    )
  } else if (env === 'staging') {
    sequelize = new Sequelize(
      staging.database,
      staging.username,
      staging.password,
      staging
    )
  } else {
    sequelize = new Sequelize(
      development.database,
      development.username,
      development.password,
      development
    )
  }

  const models = [ApiKey]
  sequelize.addModels([...models])
  try {
    await sequelize.authenticate()
    logger.info('Sequelize models added')
    return sequelize
  } catch (err) {
    logger.error('database connection error', err)
    process.exit(1)
  }
}

export default sequelizeLoader
