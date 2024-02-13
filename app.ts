import * as express from 'express'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
import bookRouter from './routes/bookRouter'

const app = express()
mongoose
  .connect('mongodb://127.0.0.1/bookApi')
  .then(() => {
    console.log('MongoDB connected successfully')
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`)
    })
  })
  .catch(err => {
    console.log('MongoDB Connection Error. ', err)
  })

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api', bookRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my API.')
})
