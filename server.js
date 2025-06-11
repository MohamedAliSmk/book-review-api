require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const asyncRoutes = require('./routes/async');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/async', asyncRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;