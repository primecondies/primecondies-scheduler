const CronJob = require("cron").CronJob;
const updateDB = require("../helpers/updatedb");

// Object containing a list of climbing locations
const places = require("../config/crags");

// Cron job that will update the weather in the database every 15 minutes
const updateWeather = new CronJob("0 */15 * * * *", () => {
  places.forEach((place) => {
    updateDB(place);
  });
});

module.exports = updateWeather;