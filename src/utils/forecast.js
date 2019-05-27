const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/6d96faf78edc7d6f7fb8123a1e530b46/' + lat + ',' + long + '?units=si&exclude=[minutely, hourly, alert, flags]'

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to contact the service.', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const temp = body.currently.temperature
            const perc = body.currently.precipProbability
            const todaySummary = body.daily.data[0].summary

            callback(undefined, todaySummary + " It is " + temp + "°C degrees. There is " + perc + "%  chance of rain.")
        }
    })
}

module.exports = forecast