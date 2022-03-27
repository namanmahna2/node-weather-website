const { response } = require('express')
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=191825f3240dcf6ac643cf6ee2fc2296&query=' + latitude + ',' + longitude


    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Kindly check ur internet connection', undefined)
        } else if (body.error) {
            callback('Kindly enter the location', undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                descp: body.current.weather_descriptions,
                wind: body.current.wind_speed,
                windDir: body.current.wind_dir
            })
        }
    })
}

module.exports = forecast