import bcrypt from 'bcrypt'
import crypto from 'crypto'
import config from '@core/config'

const API_KEY_VERSION = config.get('apiKey.version')
const API_KEY_SALT = config.get('apiKey.salt')
const API_KEY_PREFIX = config.get('apiKey.prefix')
const getApiKeyHash = async (apiKey: string): Promise<string> => {
  const [name, env, version, key] = apiKey.split('_')
  const hash = await bcrypt.hash(key, API_KEY_SALT)
  const apiKeyHash = `${name}_${env}_${version}_${hash.replace(
    API_KEY_SALT,
    ''
  )}`
  return apiKeyHash
}

export const generateApiKeyFromName = (name: string): string => {
  const randomString = crypto.randomBytes(32).toString('base64')
  return `${name}_${API_KEY_PREFIX}_${API_KEY_VERSION}_${randomString}`
}

export { getApiKeyHash }
