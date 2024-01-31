const connectingToDB = require("./config/db");
const express = require("express");

require("dotenv").config();

connectingToDB();
const app = express();

app.use(express.json());

const {
  createAuthor,
  getAuthorsWithBooks,
} = require("./controllers/authorControllers");
const {
  createBook,
  getBooks,
  getFullInfoAboutBook,
} = require("./controllers/bookControllers");

app.post("/api/authors", createAuthor);
app.post("/api/books", createBook);
app.get("/api/books", getBooks);
app.get("/api/books/full", getFullInfoAboutBook);
app.get("/api/author/info", getAuthorsWithBooks);

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
