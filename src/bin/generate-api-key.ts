require('module-alias/register')

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import { generateApiKeyFromName, getApiKeyHash } from '@core/utils'
import { program } from 'commander'

const generateApiKey = async (name: string): Promise<void> => {
  const apiKeyPlainText = generateApiKeyFromName(name)
  const apiKeyHash = await getApiKeyHash(apiKeyPlainText)
  // eslint-disable-next-line no-console
  console.log({ name, apiKeyHash, apiKeyPlainText })
}

program.requiredOption(
  '-n, --name <name>',
  'name of person/organization that you are creating for'
)

program.parse(process.argv)

const { name } = program.opts()

generateApiKey(name.replace(/[^a-zA-Z0-9-]/g, '')).catch(console.error)
