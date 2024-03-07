const book = require("./models/book");
const mongoose = require("mongoose");

main();

async function main() {
  await mongoose.connect("mongodb://localhost:27017/my_database");
  await add_items();
  mongoose.connection.close();
}

async function book_Create(title, price, count, category, description, author) {
  const book_details = {
    title: title,
    price: price,
    count: count,
    category: category,
    description: description,
    author: author,
  };
  const new_book = new book(book_details);
  await new_book.save();
}

async function add_items() {
  await Promise.all([
    book_Create(
      "the way of kings",
      30,
      10,
      "fantasy",
      "The Way of Kings is an epic fantasy novel by Brandon Sanderson. It is the first book in the Stormlight Archive series and follows the story of Dalinar, Kaladin, and Shallan as they navigate the turbulent world of Roshar and uncover their destinies.",
      "Brandon Sanderson"
    ),

    book_Create(
      "the lord of the rings, the fellowship of the ring",
      15,
      23,
      "fantasy",

      " A hobbit named Frodo inherits the One Ring, which can destroy the entire world. With the recently reawakened evil, being Sauron, going after the Ring to cement his reign, Frodo joins with eight others to destroy the Ring and defeat Sauron.",
      "J.R.R Tolkien"
    ),

    book_Create(
      "fundation",
      21,
      5,
      "sci fi",

      "Foundation is a science fiction book by Isaac Asimov. It tells the story of a mathematician who predicts the fall of a galactic empire and sets up a foundation to prevent a dark age.",
      "Isaac Asimov"
    ),

    book_Create(
      "1983",
      12,
      13,
      " dystopian literature",

      "1984 is a dystopian novel that was written by George Orwell and published in 1949. It tells the story of Winston Smith, a citizen of the miserable society of Oceania, who is trying to rebel against the Party and its omnipresent symbol, Big Brother.",
      "George Orwell"
    ),

    book_Create(
      "Sherlok Holmes, a study in scarlet",
      16,
      18,
      "crime",

      "the very first Holmes tale, Dr. Watson describes Sherlock Holmes as being more than six feet tall, very lean, with piercing eyes and a thin hawk-like nose. Holmes's voice was high and occasionally strident. We learn later that his eyes were gray and he had a narrow face and black hair.",
      "Sir Arthur Conan Doyle"
    ),
  ]);
}
