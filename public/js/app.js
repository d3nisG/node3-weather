const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#msg-1");
const message2 = document.querySelector("#msg-2");
const iconDiv = document.querySelector("#msg-3");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  message1.textContent = "Loading...";
  message2.textContent = "";

  /**
   * fetch -> triggers the route '/weather' set in src/app.js
   * There it calls geocode function passing the parameter from query-string
   */
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
      } else {
        message1.innerHTML = getIcon(data.icon) + " " + data.location;
        message2.textContent = data.forecastData;
        //iconDiv.innerHTML = "Weather icon: " + getIcon(data.icon);
      }
    });
  });
});

function getIcon(iconString) {
  switch (iconString) {
    case "rain":
      return '<i class="wi wi-rain"></i>';
    case "clear-day":
      return '<i class="wi wi-day-sunny"></i>';
    case "clear-night":
      return '<i class="wi wi-sunny"></i>';
    case "snow":
      return '<i class="wi wi-snow"></i>';
    case "sleet":
      return '<i class="wi wi-sleet"></i>';
    case "wind":
      return '<i class="wi wi-windy"></i>';
    case "fog":
      return '<i class="wi wi-fog"></i>';
    case "cloudy":
      return '<i class="wi wi-cloudy"></i>';
    case "partly-cloudy-day":
      return '<i class="wi wi-day-cloudy"></i>';
    case "partly-cloudy-night":
      return '<i class="wi wi-night-alt-cloudy"></i>';
  }
}
