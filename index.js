function currentLocation(position) {
  let apiKey = "616d4f1d4c8141d448674e1f1ec401a1";
  let endPoint = "https://api.openweathermap.org/";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `${endPoint}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&&units=${unit}`;

  axios.get(apiUrl).then(displayCurrentData);
}

function displayCurrentData(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let temperature = Math.round(response.data.main.temp);
  let maxTemp = document.querySelector("#max-temp");
  let maximumTemp = Math.round(response.data.main.temp_max);
  let minTemp = document.querySelector("#min-temp");
  let minimumTemp = Math.round(response.data.main.temp_min);
  currentTemp.innerHTML = `${temperature}`;
  document.querySelector("#locationResult").innerHTML = response.data.name;
  minTemp.innerHTML = ` ${minimumTemp}°C`;
  maxTemp.innerHTML = `${maximumTemp}°C`;
  let windSpeed = document.querySelector("#windSpeed");
  let humidity = document.querySelector("#humidity");
  let windSpeedValue = response.data.wind.speed;
  let humidityValue = response.data.main.humidity;
  windSpeed.innerHTML = `${windSpeedValue} km/h`;
  humidity.innerHTML = `${humidityValue}%`;
}

//Change current location
function searchLocation(response) {
  response.preventDefault();
  let apiKey = "616d4f1d4c8141d448674e1f1ec401a1";
  let endPoint = "https://api.openweathermap.org/";
  let unit = "metric";
  let searchCity = document.querySelector("#searchCity");
  let city = `${searchCity.value}`;
  let apiUrl = `${endPoint}data/2.5/weather?q=${city}&appid=${apiKey}&&units=${unit}`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchCity.value}`;

  axios.get(apiUrl).then(displaySearchData);
}

//Solution Example
function displaySearchData(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#currentTemp").innerHTML = `${temperature}`;

  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  document.querySelector("#max-temp").innerHTML = `${maxTemp}°C`;
  document.querySelector("#min-temp").innerHTML = ` ${minTemp}°C`;

  document.querySelector("h1").innerHTML = response.data.name;

  let windSpeedValue = response.data.wind.speed;
  let humidityValue = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = `${windSpeedValue} km/h`;
  document.querySelector("#humidity").innerHTML = `${humidityValue}%`;
}

let searchButton = document.querySelector("#searchBar");
searchButton.addEventListener("submit", searchLocation);

navigator.geolocation.getCurrentPosition(currentLocation);

// Change current time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
let currentMinute = now.getMinutes();

let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${currentDay}, ${currentHour}:${currentMinute}`;
