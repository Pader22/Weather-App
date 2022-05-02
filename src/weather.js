let current = new Date();
console.log(current);

let currentDate = document.querySelector("#date-time");
days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[current.getDay()];

let hours = current.getHours();
let minutes = current.getMinutes();
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

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
  let cityTemp = document.querySelector("#temp-change");
  cityTemp.innerHTML = temperature + `°`;
}

function currentCity(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let unit = "metric";
  let currentCity = document.querySelector("#city-location");
  currentCity.innerHTML = `${lat} and ${long}`;
  let apiKey = "12c6b70ea425a89a344e6ef71bd22aca";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(currentCityTemp);
}

function currentButton() {
  navigator.geolocation.getCurrentPosition(currentCity);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", currentButton);
