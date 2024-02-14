import { Request, Response } from 'express'
import { IBook, IBookQuery } from '../interfaces/interface'
import Book from '../models/bookModels'

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const query: IBookQuery = {}
  if (req.query.genre) {
    query.genre = req.query.genre as string
  }

  try {
    const books: IBook[] = await Book.find(query)
    res.json(books)
  } catch (error) {
    res.send(error)
  }
}

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book: IBook | null = await Book.findById(req.params.bookId)
    res.json(book)
  } catch (error) {
    res.send(error)
  }
}

export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book: IBook | null = await Book.findById(req.params.bookId)
    res.status(201).json(book)
  } catch (error) {
    res.send(error)
  }
}

export const replaceBook = async (req: Request, res: Response): Promise<void> => {
  const { title, author, read, genre } = req.body
  try {
    const book = await Book.findById(req.params.bookId)
    if (book) {
      book.title = title
      book.genre = genre
      book.author = author
      book.read = read
      book.save()
    }
    res.json(book)
  } catch (error) {
    res.send(error)
  }
}

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book: any = await Book.findById(req.params.bookId)
    if (req.body._id) {
      delete req.body._id
    }

    if (book) {
      Object.entries(req.body).forEach(item => {
        const key = item[0]
        const value = item[1]
        book[key] = value
      })
      book.save()
    }
    res.json(book)
  } catch (error) {
    res.send(error)
  }
}

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    await Book.findByIdAndDelete(req.params.bookId)
    res.send('Book Deleted Successfully.')
  } catch (error) {
    res.send(error)
  }
}
