const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {

  var city = req.body.city;

  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=b0af10367a098da9475662078c1c3534&units=metric";

  https.get(url, function(respose) {

    respose.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl ="http://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<h1>The Weather of " + city + "  city is " + temp + " degrees celcius<h1/>");
      res.write("<h1>The weather condition is "+weatherDescription+"</h1>"+"<img src="+imgUrl+">");
      res.send();

    })

  });

});

app.listen(3000, function() {
  console.log("App is running on server 3000");
})
