const { response } = require("express");
const express = require("express");
const app = express();
const https = require("https")
const bodyParser = require("body-parser");

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.use(bodyParser.urlencoded({extended:true}));

app.post("/",function(req,res){
    console.log(req.body.city);
    var city =req.body.city;
    var apikey="a535aa83f5f6fcb55d2c9876c3f18461";
    var unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit;
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            var icon= weatherData.weather[0].icon;
            const imgurl= "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the weather disciption is "+weatherData.weather[0].description+"</p>");
            res.write("<h1>the temp in "+city+" is "+weatherData.main.temp+"degree celcius</h1>");
            res.write("<img src="+imgurl+">");
            res.send();
        })
    });
})




    


app.listen(3000,function(){
    console.log("server is running on port 3000");
})