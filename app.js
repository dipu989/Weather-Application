var APPID = "bb033bbb3fba86ffca767e06fef2bf87";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

function updateByPin(pin)
{
  var url = "https://openweathermap.org/data/2.5/weather?"+
  "zip="+ pin +
  "&APPID=" + APPID;
  sendRequest(url);
}

function updateByGeo(lat,lon){
  var url = "https://openweathermap.org/data/2.5/weather?"+
  "lat=" + lat +
  "&lon=" + lon +
  "&APPID=" + APPID;
  sendRequest(url);
}
function sendRequest(url)
{
  var xmlhttp = new XMLHttpRequest();

  console.log("Hi");
  xmlhttp.onreadystatechange = function() {

    if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      console.log("Hii Bro");
      var weather = {};
      weather.icon = data.weather[0].id;
      weather.humidity = data.main.humidity;
      weather.wind = data.wind.speed;
      weather.direction = data.wind.deg;
      weather.loc = data.name;
      weather.temp = data.main.temp;
      xmlhttp.open("GET",url,true);
      xmlhttp.send();
  }
};
}

function showPosition(position){
  console.log(position.coor.latitude);
  updateByGeo(position.coord.latitude,position.coord.longitude);
}

function update(weather) {
  wind.innerHTML = weather.wind;
  direction.innerHTML = weather.direction;
  humidity.innerHTML = weather.humidity;
  loc.innerHTML = weather.loc;
  temp.innerHTML = weather.temp;
  icon.src = "imgs/codes/" + weather.icon + ".png";
}

window.onload = function() {
  temp = document.getElementById("temp");
  loc = document.getElementById("loc");
  icon = document.getElementById("icon");
  humidity = document.getElementById("humidity");
  wind = document.getElementById("wind");
  direction = document.getElementById("direction");

  if(navigator.geolocation){
    var pos = navigator.geolocation.getCurrentPosition(showPosition);
  }
  else{
    var pin = window.prompt("We could not discover your location. What is your zip Code?");
    updateByPin(pin);
  }
  updateByPin(94040);
}
