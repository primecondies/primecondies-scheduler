var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
  location: String,
  latitude: String,
  longitude: String,
  currently: {
    time: String,
    summary: String,
    icon: String,
    precipProbability: Number,
    precipType: String,
    temperature: String,
    humidity: Number,
    windSpeed: Number,
    windBearing: Number,
    cloudCover: Number
  },
  hourly: [{
    time: String,
    summary: String,
    icon: String,
    precipProbability: Number,
    precipType: String,
    temperature: String,
    humidity: Number,
    windSpeed: Number,
    windBearing: Number,
    cloudCover: Number
  }]
});

var Place = mongoose.model("Place", placeSchema);

module.exports = Place;