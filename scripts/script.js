const $ = document;

const inputValue = $.querySelector(".search-input");
const note = $.querySelector(".note");
const temp = $.querySelector(".temp");
const status = $.querySelector(".status");
const imgStatus = $.querySelector(".icon-weather");
const minTempSpan = $.querySelector(".min-span");
const maxTempSpan = $.querySelector(".max-span");
const countrySpan = $.querySelector(".country-span");
const windSpan = $.querySelector(".wind-span");
const desc = $.querySelector(".desc-span");

const image = ["/images/rain.png", "/images/sunny.png", "/images/clouds.png"];

// let city = null;

// inputValue.addEventListener("input", (e) => {
//   city = e.target.value;
//   const apiKey = "f27ceb4c6b0c2b0a3a574ee6f5642bf2";
//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//   fetch(apiUrl)
//     .then((response) => response.json())
//     .then((data) => {
//       noteValue = data.name;
//       note.innerHTML = data.name;
//       tempValue = Math.floor(data.main.temp - 273.15);
//       temp.innerHTML = tempValue;
//       status.innerHTML = data.weather[0].main;
//       if (data.weather[0].main == "Clear") {
//         imgStatus.src = image[1];
//       } else if (data.weather[0].main == "Clouds") {
//         imgStatus.src = image[2];
//       }
//     });
// });
// console.log(imgStatus);

let city = null;
async function searchHandler(event) {
  city = event.target.value;
  if (city) {
    const weatherData = await getWeather(city);
  }
  console.log(city);
}

async function getWeather(city) {
  const apiKey = "f27ceb4c6b0c2b0a3a574ee6f5642bf2";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  if (city) {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);

        let tempValue = Math.floor(data.main.temp - 273.15);
        let noteValue = data.name;
        let statusValue = data.weather[0].main;
        let minTemp = Math.floor(data.main.temp_min - 273.15);
        let maxTemp = Math.floor(data.main.temp_max - 273.15);
        let country = data.sys.country;
        let speedWind = data.wind.speed;
        let description = data.weather[0].description;

        note.innerHTML = noteValue;
        temp.innerHTML = tempValue;
        status.innerHTML = statusValue;
        minTempSpan.innerHTML = `${minTemp}C°`;
        maxTempSpan.innerHTML = `${maxTemp}C°`;
        countrySpan.innerHTML = country;
        windSpan.innerHTML = speedWind;
        desc.innerHTML = description;

        if (statusValue == "Clear") {
          imgStatus.src = image[1];
        } else if (statusValue == "Clouds") {
          imgStatus.src = image[2];
        } else if (statusValue == "Clouds" || "Drizzle" || "Rain") {
          imgStatus.src = image[0];
        }
      })
      .catch((error) => console.log(error));
  }
}

inputValue.addEventListener("input", searchHandler);
