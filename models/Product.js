"use strict";

/*
 * Defined the Mongoose Schema and return a Model for a Photo
 */

/* jshint node: true */

var mongoose = require("mongoose");

/*
 * Photo can have comments and we stored them in the Photo object itself using
 * this Schema:
 */

var productSchema = new mongoose.Schema({
  id: Number,
  category: String,
  name: String,
  image: String,
  description: String,
  price: Number,
  button: String,
});

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model("Product", productSchema);

// make this available to our photos in our Node applications
module.exports = Product;
