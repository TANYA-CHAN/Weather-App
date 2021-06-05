// jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
// res.send("Up&running");
res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  // console.log(req.body.cityName);
  // console.log("Post request received!");
  const query = req.body.cityName;
  const apiKey = "b895ed04fe9ac26492b838f8fda0b910";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ units;

  https.get(url,function(response){
    console.log(response.statusCode);

  response.on("data", function(data){
    const weatherData = JSON.parse(data);
    // console.log(weatherData)
    const temp = weatherData.main.temp_min;
    // console.log(temp);
    const temp1 = weatherData.weather[0].description;
    // console.log(temp1);
    const icon = weatherData.weather[0].icon;
    const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
    res.write("<p>The weather is currently "+ temp1 +"</p>");
    res.write("<h1>The temperature in "+ query +" is "+ temp +" degree Celsius!</h1>");
    res.write("<img src="+ imageURL +">");
    res.send();
  });
  });
});


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
