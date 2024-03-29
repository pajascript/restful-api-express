"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bookController_1 = require("../controllers/bookController");
var book_1 = require("../middlewares/book");
var router = (0, express_1.Router)();
router.route('/books').get(bookController_1.getBooks).post(bookController_1.addBook);
router.use('/books/:bookId', book_1.verifyBook);
router.route('/books/:bookId').get(bookController_1.getBookById).put(bookController_1.replaceBook).patch(bookController_1.updateBook);
exports.default = router;
