// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/library', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Schema
const bookSchema = new mongoose.Schema({
  id: Number,
  title: String,
  author: String,
  categoryCode: String
});

const Book = mongoose.model('Book', bookSchema);

// Routes
app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json({ message: 'Book added successfully', book });
});

app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.listen(5000, () => console.log('Server running on port 5000'));
