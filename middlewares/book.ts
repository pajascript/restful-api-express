import { Request, Response, NextFunction } from 'express'
import Book from '../models/bookModels'

export const verifyBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId)
    if (book) {
      return next()
    } else {
      return res.status(400).send('No book found')
    }
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}
