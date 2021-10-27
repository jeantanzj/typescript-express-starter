import winston from 'winston'
const transports = [new winston.transports.Console({ handleExceptions: true })]

const logger: winston.Logger = winston.createLogger({
  level: 'debug',
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format((data) => {
      if (data.awsRequestId) {
        data.message = `[${data.awsRequestId}] "${data.message}"`
        delete data.awsRequestId
      }
      return data
    })(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports,
  exitOnError: false,
})

logger.stream = {
  // @ts-ignore
  write: (message: string, _encoding: any): void => {
    // use the 'info' log level so the output will be picked up by both transports
    logger.info(message)
  },
}

export default logger
