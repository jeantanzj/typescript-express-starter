import { ApiKey } from '@core/db/models'
import { getApiKeyHash } from '@core/utils'
import express from 'express'

const getApiKey = (req: express.Request): string | null => {
  const headerKey = 'Bearer'
  const authHeader = req.get('Authorization')
  if (!authHeader) return null

  const [header, apiKey] = authHeader.split(' ')
  if (headerKey !== header) return null

  const [name, version, key] = apiKey.split('_')
  if (!name || !version || !key) return null

  return apiKey
}

const isApiKeyAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const apiKey = getApiKey(req)
  if (apiKey !== null) {
    const hash = await getApiKeyHash(apiKey)
    const user = await ApiKey.findOne({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      where: { api_key_hash: hash },
    })

    if (user) {
      res.locals.user = {
        id: user.get('id') as number,
        name: user.get('name') as string,
        scopes: user.get('scopes') as any,
        metadata: user.get('metadata') as any,
      }
      return next()
    }
  }
  return res.sendStatus(401)
}

export { isApiKeyAuthenticated }
