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
app.put("/product/plus/:id", async function (req, res) {
  const id = req.params.id;
  const prevData = await Product.find({ id: id });
  let prevCount = prevData[0].count;
  const data = await Product.find({ id: id }).updateOne({
    count: prevCount + 1,
  });
  return res.status(200).send(data);
});

app.put("/product/minus/:id", async function (req, res) {
  const id = req.params.id;
  const prevData = await Product.find({ id: id });
  let prevCount = prevData[0].count;
  if (prevCount > 0) {
    const data = await Product.find({ id: id }).updateOne({
      count: prevCount - 1,
    });
    return res.status(200).send(data);
  }
  return res.status(200).send({ error: "count equal 0" });
});

app.put("/product/clean", async (req, res) => {
  const data = await Product.find().updateMany({ count: 0 });
  return res.status(200).send(data);
});
app.listen(3001);
