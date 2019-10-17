const express = require("express");
const hbs = require("hbs");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const partialPath = path.join(__dirname,"../template/partials")
const viewsPath = path.join(__dirname,"../template")
const looksPath = path.join(__dirname,"../template/looks");

const app = express();
app.use(express.static(looksPath))
const port = process.env.PORT || 3000;

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialPath);



app.get("/",(req,res)=>{
    res.render("index",{
        title: "weather",
        name :"Aniket"
    })
});

app.get("/help",(req,res)=>{
    res.render("help",{
        title: "help",
        name:"Aniket"
        
    })
});

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"no address provided"
        })
    }
    geocode(req.query.address,(error,{long,lat,location}={})=>{
       console.log(error)
        if(error){
           res.send({
               error:error
           })
       }
           else{
            console.log(long,lat,location)
            forecast(lat,long,(err,data)=>{
               if(err){
                   return res.send({
                    error:"cant get lat and long"
                   })
               }else{
                   console.log(data);
                res.send({
                   temp:data.temp,
                   precip:data.precip,
                   summary:data.summary,
                   address: location
               })
               }
           })
       }
    })

});

app.get("/about",(req,res)=>{
    res.render("about",{
        title: "about",
        name:"Aniket"
    })
});


app.listen(port,()=>{
    console.log("yo running");
})