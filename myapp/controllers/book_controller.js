const books = require("../models/book");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/my_database");

exports.index = asyncHandler(async (req, res, next) => {
  const books_count = await books.countDocuments();

  const total_books = await books.aggregate([
    {
      $group: {
        _id: null,
        totalCount: { $sum: "$count" },
      },
    },
  ]);

  const category_count = await books.aggregate([
    {
      $group: {
        _id: null,
        totalCategories: { $addToSet: "$category" },
      },
    },
    {
      $project: {
        _id: 0,
        totalCategories: { $size: "$totalCategories" },
      },
    },
  ]);

  res.render("index", {
    books_count: books_count,
    total_books: total_books[0].totalCount, // Extracting the totalCount from the result
    category_count: category_count[0].totalCategories, // Extracting the totalCategories from the result
  });
});

exports.all = asyncHandler(async (req, res, next) => {
  const all_items = await books.find({}).select("title");
  res.render("all", { all_items: all_items });
});

exports.create = asyncHandler(async (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const count = req.body.count;
  const description = req.body.description;
  const category = req.body.category;
  const author = req.body.author;

  await books.insertMany({
    title: title,
    price: price,
    count: count,
    description: description,
    category: category,
    author: author,
  });

  res.redirect("/");
});

exports.item = asyncHandler(async (req, res, next) => {
  const item = await books.findById(req.params.id);

  res.render("item", {
    item:item
  })
});
