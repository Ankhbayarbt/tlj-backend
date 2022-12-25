const express = require("express");
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var cors = require("cors");
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://Ankhaaa205:tlj12345@cluster0.7xa8w79.mongodb.net/bakery",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("mongoose connected");
  })
  .catch(() => {
    console.log("mongoose not connected");
  });
const Product = require("./models/Product.js");
const Basket = require("./models/Basket.js");
app.get("/product/list", async function (req, res) {
  const data = await Product.find();
  console.log(data);
  res.status(200).send(data);
});
app.get("/product/count", async function (req, res) {
  const data = await Product.find().where("count").gt(0);
  return res.status(200).send(data);
});
app.listen(3001);
