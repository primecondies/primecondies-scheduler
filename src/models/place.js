var mongoose = require("mongoose");

var placeSchema = new mongoose.Schema({
  location: String,
  latitude: String,
  longitude: String,
  currently: {
    time: Number,
    summary: String,
    icon: String,
    nearestStormDistance: Number,
    precipIntensity: Number,
    precipIntensityError: Number,
    precipProbability: Number,
    precipType: String,
    temperature: Number,
    apparentTemperature: Number,
    dewPoint: Number,
    humidity: Number,
    pressure: Number,
    windSpeed: Number,
    windGust: Number,
    windBearing: Number,
    cloudCover: Number,
    uvIndex: Number,
    visibility: Number,
    ozone: Number
  },
  hourlySummary: String,
  hourlyIcon: String,
  hourly: [{
    time: Number,
    nearestStormDistance: Number,
    precipIntensity: Number,
    precipIntensityError: Number,
    precipProbability: Number,
    precipType: String,
    temperature: Number,
    apparentTemperature: Number,
    dewPoint: Number,
    humidity: Number,
    pressure: Number,
    windSpeed: Number,
    windGust: Number,
    windBearing: Number,
    cloudCover: Number,
    uvIndex: Number,
    visibility: Number,
    ozone: Number
  }]
});

var Place = mongoose.model("Place", placeSchema);

module.exports = Place;