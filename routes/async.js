const express = require('express');
const router = express.Router();
const books = require('../data/books');

// 10. Get all books (Callback)
router.get('/callback', (req, res) => {
  getBooksCallback(data => {
    res.json(data);
  });
});

function getBooksCallback(callback) {
  setTimeout(() => {
    callback(books);
  }, 100);
}

// 11. Get book by ISBN (Promise)
router.get('/promise/:isbn', (req, res) => {
  getBookByISBNE(req.params.isbn)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ message: err }));
});

function getBookByISBNE(isbn) {
  return new Promise((resolve, reject) => {
    const book = books.find(b => b.isbn === isbn);
    book ? resolve(book) : reject('Book not found');
  });
}

// 12. Get books by author (Async/Await)
router.get('/author/:author', async (req, res) => {
  try {
    const result = await getByAuthor(req.params.author);
    res.json(result);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

async function getByAuthor(author) {
  return books.filter(b => b.author.toLowerCase() === author.toLowerCase());
}

// 13. Get books by title (Async/Await)
router.get('/title/:title', async (req, res) => {
  try {
    const result = await getByTitle(req.params.title);
    res.json(result);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

async function getByTitle(title) {
  return books.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
}

module.exports = router;
