const request = require('request');

const geocode = (adress, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+adress+'.json?access_token=pk.eyJ1IjoiYm9iYXVrciIsImEiOiJjazc3bzM1czUwM2JuM2ZudnlyaDc0M3owIn0.XpXP_VBguvDhL2LZO5ohKA&limit=1';

        request({ url, json: true },(error, {body})=>{
        if(error){
            callback('Unable to connect to Geolocation services', undefined);
        }else if(body.features.length===0){
            callback('Unable to find location. Try again with different search term', undefined);
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;