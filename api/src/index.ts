import express from 'express'

function bootstrap() {
  const app = express()

  app.get('/welcome', (req, res) => {
    res.send('hello world')
  })

  const port = 3000

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`)
  })
}

bootstrap()
