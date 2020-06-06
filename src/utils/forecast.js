const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/6d96faf78edc7d6f7fb8123a1e530b46/" +
    lat +
    "," +
    long +
    "?units=si&exclude=[minutely, hourly, alert, flags]";

  request(
    {
      url,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback("Unable to contact the service.", undefined, undefined);
      } else if (body.error) {
        callback(body.error, undefined, undefined);
      } else {
        const temp = body.currently.temperature;
        const perc = body.currently.precipProbability;
        const todaySummary = body.daily.data[0].summary;
        const tempHigh = body.daily.data[0].temperatureHigh;
        const tempLow = body.daily.data[0].temperatureLow;

        // temp icon
        const icon = body.daily.data[0].icon;

        callback(
          undefined,
          todaySummary +
            " It is " +
            temp +
            "°C degrees. There is " +
            perc +
            "%  chance of rain. High temp: " +
            tempHigh +
            ", Low temp: " +
            tempLow,
          icon
        );
      }
    }
  );
};

module.exports = forecast;
