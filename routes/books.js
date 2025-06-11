const express = require('express');
const router = express.Router();
const books = require('../data/books');
const authenticateToken = require('../middleware/auth');

// 1. Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// 2. Get book by ISBN
router.get('/isbn/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).json({ message: 'Book not found' });
});

// 3. Get books by author
router.get('/author/:author', (req, res) => {
  const results = books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase());
  results.length ? res.json(results) : res.status(404).json({ message: 'No books by that author' });
});

// 4. Get books by title
router.get('/title/:title', (req, res) => {
  const results = books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase()));
  results.length ? res.json(results) : res.status(404).json({ message: 'No books with that title' });
});

// 5. Get reviews for a book
router.get('/review/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book.reviews || {});
});

// 8. Add/Modify a review (JWT protected)
router.put('/review/:isbn', authenticateToken, (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const username = req.user.username;
  const { review } = req.body;

  if (!review) return res.status(400).json({ message: 'Review content required' });

  book.reviews[username] = review;
  res.json({ message: 'Review added/updated', reviews: book.reviews });
});

// 9. Delete a review (JWT protected)
router.delete('/review/:isbn', authenticateToken, (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const username = req.user.username;
  if (!book.reviews[username]) {
    return res.status(404).json({ message: 'No review by this user' });
  }

  delete book.reviews[username];
  res.json({ message: 'Review deleted' });
});

module.exports = router;
