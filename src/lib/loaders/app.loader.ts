require('module-alias/register')
import express from 'express'
import morgan from 'morgan'
import { errors as celebrateErrorMiddleware } from 'celebrate'
import path from 'path'
import logger from '@core/logger'
import { isApiKeyAuthenticated } from '@core/middleware/auth.middleware'
const expressApp = ({ app }: { app: express.Application }): void => {
  app.use(morgan('combined'))
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(express.static(path.join(__dirname, '../..', 'assets')))

  // Healthcheck
  app.get('/ping', (_req: express.Request, res: express.Response) => {
    return res.sendStatus(200)
  })

  app.get(
    '/auth',
    isApiKeyAuthenticated,
    (_req: express.Request, res: express.Response) => {
      return res.sendStatus(200)
    }
  )

  //Error handler
  app.use(celebrateErrorMiddleware())
  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      logger.error(err)
      return res.status(500).json('An error occurred')
    }
  )
}
// Export app
export default expressApp
