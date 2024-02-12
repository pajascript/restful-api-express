import * as express from 'express'
import { Request, Response, Router } from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Book from './models/bookModels'
import { IBook, IBookQuery } from './interfaces/interface'

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
const bookRouter = Router()

app.use(bodyParser.urlEncoded({ extended: true }))
app.use(bodyParser.json())

bookRouter
  .route('/books')
  .get(async (req: Request, res: Response) => {
    const query: IBookQuery = {}
    if (req.query.genre) {
      query.genre = req.query.genre as string
    }
    try {
      const books: IBook[] = await Book.find(query)
      return res.json(books)
    } catch (error) {
      return res.send(error)
    }
  })
  .post((req: Request, res: Response) => {
    const book = new Book(req.body)

    console.log(book)
    res.json(book)
  })

bookRouter.route('/books/:bookId').get(async (req: Request, res: Response) => {
  try {
    const book: IBook | null = await Book.findById(req.params.bookId)
    return res.json(book)
  } catch (error) {
    return res.send(error)
  }
})

app.use('/api', bookRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to my API.')
})
