const request = require("request");
const geocode = (address,callback)=>{
    const url= "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYW5pa2V0dHlhZ2kxMyIsImEiOiJjazFvaTAxNjcwaTBlM2RwaHRsY3hrZHprIn0.IOC7XT55LsBBWuZ8RvawaA&limit=1&autocomplete=false"
    request({url:url,json:true},(err,response)=>{
        console.log(response.body)
        if(err){
                callback("some error",undefined);
            }else if(response.body.message ){
                callback(response.body.message,undefined);
            }else if(!response.body.features.length){
                 callback('no address found. try another address',undefined)
            }
            else{
                console.log("ho")
                const data={
             long: response.body.features[0].center[0],
             lat: response.body.features[0].center[1],
             location : response.body.features[0].place_name   
            }
            callback(undefined,data);        
        }
    
    })
    
    }

    module.exports = geocode;