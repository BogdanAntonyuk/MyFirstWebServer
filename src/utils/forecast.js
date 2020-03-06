const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/4121e880bdb8b313a20bf950aef6f2ae/' + latitude + ',' + longitude + '?units=si';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('unable to find location. ' + 'code error: ' + body.code, undefined);
    } else {
      callback( undefined, body.daily.data[0].summary + ' It is currently ' +
          body.currently.temperature + ' degrees out. There is a ' + 
          body.currently.precipProbability + '% chance of rain.'
      );
    }
  });
};

module.exports = forecast;
