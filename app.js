var APPID = "bb033bbb3fba86ffca767e06fef2bf87";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByPin(pin)
{
  var url = "http://api.openweathermap.org/data/2.5/weather?"+
  "zip="+ pin +
  "&APPID=" + APPID;
  sendRequest(url);
}

function updateByGeo(lat, lon)
{
  var url = "http://api.openweathermap.org/data/2.5/weather?"+
  "lat=" + lat +
  "&lon=" + lon +
  "&APPID=" + APPID;
  sendRequest(url);
}

function showPosition(position)
{
  updateByGeo(position.coords.latitude,position.coords.longitude);
}

function KelvinToCelcius(temp)
{
  return Math.round(temp-273.5);
}

function sendRequest(url)
{
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      console.log(data.weather[0].description);
      var weather = {};
      weather.icon = data.weather[0].id;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.loc = data.name;
      weather.temp = KelvinToCelcius(data.main.temp);
      weather.description = data.weather[0].description;
      update(weather);
  }
};
xmlhttp.open("GET",url,true);
xmlhttp.send();
}

function update(weather)
{
  wind.innerHTML = weather.wind;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "imgs/codes/" + weather.icon + ".png";
  description.innerHTML = weather.description;
}

window.onload = function()
{
  temp = document.getElementById("temp");
  loc = document.getElementById("loc");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  description = document.getElementById("description");

if(navigator.geolocation)
{
    var showPosition = function(position)
    {
      updateByGeo(position.coords.latitude,position.coords.longitude);
    }
      navigator.geolocation.getCurrentPosition(showPosition);
  }
  else
  {
    var pin = window.prompt("We could not discover your location. What is your zip Code?");
    updateByPin(pin);
  }
}
