const mongoose = require("mongoose");
const request = require("request");
const Place = require("../models/place");

const updateDB = (place) => {
  let location = place.location;
  let latitude = place.latitude;
  let longitude = place.longitude;

  if (!location || !latitude || !longitude) {
    throw new Error("Invalid place...");
  }

  request(`https://api.darksky.net/forecast/72e16ca83479ef8e30134599dcc19b7d/${latitude},${longitude}`, (error, response, body) => {
      if (error) { throw new Error(error); }
      if (response.statusCode !== 200) { 
        throw new Error(`Status code ${response.statusCode}`);
      }
      
      let data = JSON.parse(body);

      const newPlace = new Place({
        location: location,
        latitude: latitude,
        longitude: longitude,
        currently: data.currently,
        hourlySummary: data.hourly.summary,
        hourlyIcon: data.hourly.icon,
        hourly: data.hourly.data
      });
      newPlace.save();
    });
}

module.exports = updateDB;