const request = require('request')

const geocode = (address, callback) => {
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGVuaXNzcyIsImEiOiJjanZjN3V0aGsxZnV1NDRteXZpMWZtOG93In0.8GNUrkNR8SVJjlLS7rX1Zw&limit=1'

    request({
        url: geoURL,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to contact lation services.', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', response.body.query)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode