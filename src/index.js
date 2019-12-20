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
