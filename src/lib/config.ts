import convict from 'convict'
convict.addFormats({
  'required-string': {
    validate: (val: any): void => {
      if (val === '') {
        throw new Error('Required value cannot be empty')
      }
    },
  },
})
const config = convict({
  tz: {
    default: 'Asia/Singapore',
    env: 'TZ',
  },
  env: {
    doc: 'The application environment',
    format: ['production', 'staging', 'development', 'test'],
    default: 'production',
    env: 'NODE_ENV',
  },
  mailFrom: {
    doc: 'The email address that appears in the From field of an email',
    default: '',
    env: 'SES_FROM',
  },
  mailOptions: {
    host: {
      doc: 'Amazon SES SMTP endpoint.',
      default: '',
      env: 'SES_HOST',
    },
    port: {
      doc: 'Amazon SES SMTP port, defaults to 465',
      default: 465,
      env: 'SES_PORT',
      format: 'int',
    },
    auth: {
      user: {
        doc: 'SMTP username',
        default: '',
        env: 'SES_USER',
        sensitive: true,
      },
      pass: {
        doc: 'SMTP password',
        default: '',
        env: 'SES_PASS',
        sensitive: true,
      },
    },
  },
  db: {
    username: {
      env: 'DB_USERNAME',
      sensitive: true,
      default: '',
    },
    password: {
      env: 'DB_PASSWORD',
      sensitive: true,
      default: '',
    },
    host: {
      env: 'DB_HOST',
      default: '',
      format: 'required-string',
    },
    port: {
      env: 'DB_PORT',
      default: 5432,
    },
    name: {
      env: 'DB_NAME',
      default: 'discharge',
      format: 'required-string',
    },
    minPoolSize: {
      env: 'DB_MIN_POOL_SIZE',
      default: 50,
    },
    maxPoolSize: {
      env: 'DB_MAX_POOL_SIZE',
      default: 200,
    },
  },
  apiKey: {
    prefix: {
      doc: 'Prefix for API KEY',
      default: 'TEST',
      env: 'API_KEY_PREFIX',
    },
    salt: {
      doc: 'Secret used to hash API Keys before storing them in the database',
      default: '',
      env: 'API_KEY_SALT_V1',
      format: 'required-string',
      sensitive: true,
    },
    version: {
      doc: 'Version of salt, defaults to v1',
      default: 'v1',
      env: 'API_KEY_SALT_VERSION',
    },
  },
})

config.validate({ allowed: 'strict' })
export default config
