import config from '@core/config'
import nodemailer from 'nodemailer'
import { Attachment } from 'nodemailer/lib/mailer'
import logger from '@core/logger'
const mailer = nodemailer.createTransport(config.get('mailOptions'))

const sendEmail = ({
  recipients,
  subject,
  html,
  attachments,
}: {
  recipients: string[]
  subject: string
  html: string
  attachments?: Attachment[]
}) => {
  const options = {
    from: config.get('mailFrom'),
    to: recipients,
    subject,
    html,
    headers: {},
    attachments,
  }
  return new Promise<string | void>((resolve, reject) => {
    mailer.sendMail(options, (err, info) => {
      if (err !== null) {
        logger.error('Failed to send email', err, { subject })
        reject(new Error(`${err}`))
      } else {
        logger.info('Sent email', recipients, { subject })
        resolve(info.messageId)
      }
    })
  })
}

export { sendEmail }
