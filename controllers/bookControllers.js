const Book = require("../models/book");

const createBook = async (req, res) => {
  if (
    !req.body.bookAuthor ||
    !req.body.title ||
    !req.body.year ||
    !req.body.pages ||
    !req.body.genre
  ) {
    res.status(404).send("fill inputs");
  }

  const existingBook = await Book.findOne({ title: req.body.title });
  if (existingBook) {
    return res.status(409).send("book already exist in database");
  }

  const book = await Book.create({
    bookAuthor: req.body.bookAuthor,
    title: req.body.title,
    year: req.body.year,
    pages: req.body.pages,
    genre: req.body.genre,
  });

  res.status(200).json(book);
};

const getBooks = async (req, res) => {
  const booksFromDB = await Book.find();
  console.log(booksFromDB);
  if (!booksFromDB) {
    res.status(404).send("book not found");
    return;
  }
  res.status(200).json(booksFromDB);
};

const getFullInfoAboutBook = async (req, res) => {
  const booksFromDB = await Book.find().populate(
    "bookAuthor",
    "firstname lastname about id date"
  );

  if (!booksFromDB) {
    res.status(404).send("book not found");
    return;
  }

  res.status(200).json(booksFromDB);
};


module.exports = { createBook, getBooks, getFullInfoAboutBook };
