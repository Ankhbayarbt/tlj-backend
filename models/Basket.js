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

var basketSchema = new mongoose.Schema({
  product_code: mongoose.Schema.Types.ObjectId,
  count: Number,
});

// the schema is useless so far
// we need to create a model using it
var Basket = mongoose.model("Basket", basketSchema);

// make this available to our photos in our Node applications
module.exports = Basket;
