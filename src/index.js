import './style.css';

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

const weather = {};

weather.temperature = {
  unit: 'celsius',
};

const KELVIN = 273;
const key = '99f15a158a869cfdd635370f80c21b6b';

function displayWeather() {
  iconElement.innerHTML = `<img src="../src/icons/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
  notificationElement.style.display = 'none';
}

function getWeather(city) {
  const api = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
  fetch(api)
    .then((response) => {
      const data = response.json();
      return data;
    })
    .then((data) => {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.iconId = data.weather[0].icon;
      weather.description = data.weather[0].description;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(() => {
      displayWeather();
    })
    .catch(() => {
      notificationElement.style.display = 'block';
      notificationElement.innerHTML = '<p> Please check your Location and try again </p>';
      document.querySelector('.location-search').value = '';
    });
}

function setPosition() {
  const city = document.querySelector('.location-search').value.toLowerCase();
  getWeather(city);
}

function getCity() {
  const submitButton = document.querySelector('.location-button');
  submitButton.addEventListener('click', setPosition);
}

getCity();

function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

// celsius to farenheit and farenheit to celsius is on click

tempElement.addEventListener('click', () => {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit === 'celsius') {
    let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
    fahrenheit = Math.floor(fahrenheit);

    tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
    weather.temperature.unit = 'fahrenheit';
  } else {
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    weather.temperature.unit = 'celsius';
  }
});
