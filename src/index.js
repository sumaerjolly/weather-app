import './style.css';
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

const weather = {};

weather.temperature = {
  unit: 'celsius'
};

const KELVIN = 273;
const key = '99f15a158a869cfdd635370f80c21b6b';

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
function getWeather(latitude, longitude) {
  let api = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api)
    .then(function(response) {
      let response = response.json();
      return response;
    })
    .then(function(response) {
      weather.temperature.value = Math.floor(response.main.temp - KELVIN);
      weather.iconId = response.weather[0].icon;
      weather.description = response.weather[0].description;
      weather.city = response.name;
      weather.country = response.country;
    });
}

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}
