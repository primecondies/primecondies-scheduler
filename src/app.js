const express = require("express");
const mongoose = require("mongoose");
const Place = require("./models/place");

const app = express();

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/primecondies-test", { useNewUrlParser: true });

app.listen(3000, () => {
  console.log("App started on port 3000");
});