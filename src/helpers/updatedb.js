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
      
      // Parse body into an object and create newPlace object
      let data = JSON.parse(body);
      const newPlace = {
        location: location,
        latitude: latitude,
        longitude: longitude,
        currently: data.currently,
        hourlySummary: data.hourly.summary,
        hourlyIcon: data.hourly.icon,
        hourly: data.hourly.data
      };

      // Using the location of the current place, find it in the database and
      // update it with the new data
      Place.findOneAndUpdate({location: location}, newPlace, (err) => {
        if (err) { throw new Error(err); }
      });
    });
}

module.exports = updateDB;