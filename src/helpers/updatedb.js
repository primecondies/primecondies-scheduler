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
    const newPlaceData = {
      location: location,
      latitude: latitude,
      longitude: longitude,
      currently: data.currently,
      hourlySummary: data.hourly.summary,
      hourlyIcon: data.hourly.icon,
      hourly: data.hourly.data
    };

    // Attempt to find current location in the database. If it exists, update
    // it with new data, otherwise create a new place and add it the the
    // database
    Place.findOne({ location: location }, (err, place) => {
      if (err) { throw new Error(err); }

      if (!place) {
        var newPlace = new Place(newPlaceData);
        newPlace.save();
      } else {
        Place.findOneAndUpdate({ location: location }, newPlaceData, (err) => {
          if (err) { throw new Error(err); }
        });
      }
    });

  });
}

module.exports = updateDB;