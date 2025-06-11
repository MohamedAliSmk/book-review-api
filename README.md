# 📚 Book Review API

An online book review application built with **Node.js**, **Express.js**, and **JWT authentication**.  
This RESTful API allows users to register, log in, search for books, and manage their own reviews securely.

---

## 🚀 Features

- 🔐 User Registration & Login with JWT
- 📖 Browse and search for books by ISBN, author, or title
- ✍️ Authenticated users can add, edit, and delete their own reviews
- 🧠 Async operations using Callbacks, Promises, and Async/Await
- ✅ Fully tested with Jest and Supertest

---

## 🧑‍💻 Technologies Used

- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcryptjs
- dotenv
- Jest + Supertest

---

## 📦 Installation

1. **Clone the repository**

```bash
git clone https://github.com/MohamedAliSmk/book-review-api.git
cd book-review-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create .env file**

```bash
SECRET_KEY=your_super_secret_key
```

4. **Run the server**

```bash
npm start
```

## 🧪 Run Tests

```bash
npm test
```

## 🔌 API Endpoints

## 🟢 Public Routes

Method	Route	Description
GET	/books	Get all books
GET	/books/isbn/:isbn	Get book by ISBN
GET	/books/author/:author	Get books by author
GET	/books/title/:title	Get books by title
GET	/books/review/:isbn	Get reviews for a book
POST	/users/register	Register a new user
POST	/users/login	Login and receive JWT token

## 🔐 Protected Routes (Require JWT)
Method	Route	Description
PUT	/books/review/:isbn	Add or modify user's review
DELETE	/books/review/:isbn	Delete the logged-in user's review

## 🔄 Async Routes
Method	Route	Description
GET	/async/callback	Get all books using callback
GET	/async/promise/:isbn	Get book by ISBN using promise
GET	/async/author/:author	Get books by author using async
GET	/async/title/:title	Get books by title using async

## 📸 Required Screenshots for Submission
Take Postman or test output screenshots for:

All 13 functional tasks

Test results (npm test)

GitHub repo link (Task 14)

## 🧠 Author
Mohamed Ali
GitHub Profile
LinkedIn