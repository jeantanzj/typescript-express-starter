import express from 'express'
import morgan from 'morgan'

const PORT = process.env.PORT

const app = express()

app.use(morgan('combined'))

app.get('/', (_req: express.Request, res: express.Response) => {
  return res.sendStatus(200)
})

app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err)
    return res.status(500).json('An error occurred')
  }
)

app.listen(PORT, () => {
  console.log(`App started at port ${PORT}`)
})
