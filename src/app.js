const express = require("express");
const mongoose = require("mongoose");

// Initialize app
const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/primecondies-test", { useNewUrlParser: true });

// Import and start cron jobs
const updateWeather = require("./cron/updateWeather");
updateWeather.start();

app.listen(port, () => {
  console.log(`Prime Condies Cron Jobs started on port ${port}`);
});