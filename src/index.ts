import 'source-map-support/register'
require('module-alias/register')
import express from 'express'
import sequelizeLoader from '@core/loaders/sequelize.loader'
import expressApp from '@core/loaders/app.loader'
import logger from '@core/logger'
import moment from 'moment-timezone'
moment.tz('Asia/Singapore')
const PORT = process.env.PORT || 3000

const app = express()

// HTTP server port

async function startServer() {
  await sequelizeLoader()
  logger.info('Database connected!')
  expressApp({ app })

  // Start the server by listening
  app.listen(PORT, () => {
    logger.info(`App started at port ${PORT}`)
  })
}

// Initialize and start server
startServer().catch(console.error)
