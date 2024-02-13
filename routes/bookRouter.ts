import { Router } from 'express'
import {
  getBooks,
  getBookById,
  addBook,
  replaceBook,
  updateBook
} from '../controllers/bookController'
import { verifyBook } from '../middlewares/book'

const router = Router()

router.route('/books').get(getBooks).post(addBook)

router.use('/books/:bookId', verifyBook)

router.route('/books/:bookId').get(getBookById).put(replaceBook).patch(updateBook)

export default router
