const request = require('request')

const forecast = (latitude , longitude , callback) =>{
    const url= 'https://api.darksky.net/forecast/b5585121dd41caa42a06d9b7576e96c8/'+latitude+','+longitude+'?units=si'
    request({url, json: true}, (error, { body })=> {
        if(error){
          callback('Cannot connect',undefined)
        }
        else if(body.error){
          callback("Unable to find location",undefined)
        }
        else{
          callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast


            