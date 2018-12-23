const express = require("express");
const mongoose = require("mongoose");
const Place = require("./models/place");

const updateZiApp = require("./helpers/updatedb");

// This file contains an array of places to be tracked by Prime Condies
const places = require("./config/crags");

const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/primecondies-test", { useNewUrlParser: true });

places.forEach((place) => {
  updateZiApp(place);
});


app.listen(port, () => {
  console.log(`Prime Condies Cron Jobs started on port ${port}`);
});