const request= require("request");

const forecast = (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/3bff738c7234e382aed3a54d233fdbff/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'
    request({url:url,json:true},(err,response)=>{
        if(err){
            callback("some error",undefined)
        }
        else if(response.body.error){
            callback(response.body.error,undefined)
        }else{
            const data={
                temp:response.body.currently.temperature,
                precip:response.body.currently.precipProbability,
                summary:response.body.hourly.data[0].summary
            }
            callback(undefined,data);
       } 
    })
    }
    
    module.exports= forecast;