const url = "https://restcountries.com/v3.1/all";
const apiKey = "11a1a70f88f93d84c02889beb29c768e";

const fetchWeather = (lat, lon) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  return fetch(weatherUrl).then((response) => response.json());
};

const containerDiv = document.createElement("div");
containerDiv.className = "container";

const titleElement = document.createElement("h1");
titleElement.id = "title";
titleElement.className = "text-center";
titleElement.textContent = "Restcountries & Weather using Fetch API";

const countryContainer = document.createElement("div");
countryContainer.className = "row";

containerDiv.appendChild(titleElement);
containerDiv.appendChild(countryContainer);

document.body.appendChild(containerDiv);

const handleWeatherButtonClick = (lat, lon, weatherContainer) => {
  fetchWeather(lat, lon)
    .then((weatherInfo) => {
      weatherContainer.innerHTML = `<br>
                 <p>Weather: ${weatherInfo.weather[0].description}</p>
                <p>Temperature: ${weatherInfo.main.temp} &#8451;</p>
                
            `;
    })
    .catch((error) => {
      console.error("Error fetching weather data", error);
      weatherContainer.innerHTML = "<p>Error fetching weather data</p>";
    });
};

const result = fetch(url);
result
  .then((data) => data.json())
  .then((ele) => {
    for (let i = 0; i < ele.length; i++) {
      const cardColumn = document.createElement("div");
      cardColumn.className = "col-lg-4 col-sm-12";

      const card = document.createElement("div");
      card.className = "card";

      const cardHeader = document.createElement("div");
      cardHeader.className = "card-header";
      cardHeader.textContent = ele[i].name.common;

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardBody.innerHTML = `
            <img src="${ele[i].flags.png}" class="card-img-top" style="height: 150px;">
            <h5 class="card-title">Capital: ${ele[i].capital}</h5>
            <h5 class="card-title">Region: ${ele[i].region}</h5>
            <h5 class="card-title">Sub Region: ${ele[i].subregion}</h5>
            <h5 class="card-title">Country Code: ${ele[i].cca2}</h5>
            <h5 class="card-title">LatLng: ${ele[i].latlng}</h5>
        `;

      const weatherButton = document.createElement("button");
      weatherButton.className = "btn btn-primary";
      weatherButton.textContent = "Click for Weather";
      weatherButton.addEventListener("click", () => {
        handleWeatherButtonClick(
          ele[i].latlng[0],
          ele[i].latlng[1],
          weatherContainer
        );
      });

      const weatherContainer = document.createElement("div");
      weatherContainer.className = "weather-container";

      cardBody.appendChild(weatherButton);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      card.appendChild(weatherContainer);
      cardColumn.appendChild(card);
      countryContainer.appendChild(cardColumn);
    }
  });
