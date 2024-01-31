const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please write your name"],
  },
  lastname: {
    type: String,
    required: [true, "Please write your lastname"],
  },
  about: {
    type: String,
    required: [true, "please add info"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

authorSchema.virtual("books", {
  ref: "Book",
  localField: "_id",
  foreignField: "bookAuthor",
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
