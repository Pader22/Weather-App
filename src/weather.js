function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  console.log(hours);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temp-change");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#windSpeed");
  let date = document.querySelector("#date-time");
  let weatherIcon = document.querySelector("#icon");
  temperature.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  console.log(response.data.weather[0].icon);
}

let apiKey = "12c6b70ea425a89a344e6ef71bd22aca";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Minneapolis&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-text-input");
  cityInput.innerHTML = "cityInput.value";

  let city = document.querySelector("#city-location");
  city.innerHTML = cityInput.value;

  let apiKey = "12c6b70ea425a89a344e6ef71bd22aca";
  let searchCity = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(currentCityTemp);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", searchCity);

function celTemperature(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#temp-change");
  changeTemp.innerHTML = "12°";
}
let currentTemp = document.querySelector("#temp-scale");
currentTemp.addEventListener("click", celTemperature);

function fTemperature(event) {
  event.preventDefault();
  let changeTemp = document.querySelector("#temp-change");
  changeTemp.innerHTML = "52°";
}
let fahrTemp = document.querySelector("#temp-fahr");
fahrTemp.addEventListener("click", fTemperature);

function currentCityTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  let cityTemp = document.querySelector("#temp-change");
  let windy = document.querySelector("#windSpeed");
  let wind = Math.round(response.data.wind.speed);
  let weatherIcon = document.querySelector("#icon");
  cityTemp.innerHTML = temperature;
  humidity.innerHTML = humid;
  windy.innerHTML = wind;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function cityName(position) {
  let positionCity = document.querySelector("#city-location");
  positionCity.innerHTML = position.data[0].name;
}

function currentCity(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let apiKey = "12c6b70ea425a89a344e6ef71bd22aca";
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}0&limit=5&appid=${apiKey}`;
  let tempApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(cityName);
  axios.get(tempApiUrl).then(currentCityTemp);
}

function currentButton() {
  navigator.geolocation.getCurrentPosition(currentCity);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", currentButton);
