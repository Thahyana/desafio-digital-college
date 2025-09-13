const locationEl = document.getElementById("location");
const iconEl = document.getElementById("icon");
const conditionEl = document.getElementById("condition");
const temperatureEl = document.getElementById("temperature");
const feelslikeEl = document.getElementById("feelslike");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const airEl = document.getElementById("air");
const lastUpdatedEl = document.getElementById("last_updated");
const forecastEl = document.getElementById("forecast");

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

function showLoader() {
  document.getElementById("loader").classList.remove("d-none");
}

function hideLoader() {
  document.getElementById("loader").classList.add("d-none");
}

function getWeather(city = "Fortaleza") {
  showLoader();
  forecastEl.innerHTML = "";

  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=5fff1da0f5c540d9ace173709251309&q=${city}&days=5&aqi=yes&lang=pt`
  )
    .then((response) => response.json())
    .then((data) => {
      locationEl.textContent = `${data.location.name}, ${data.location.region}`;
      iconEl.src = "https:" + data.current.condition.icon;
      conditionEl.textContent = data.current.condition.text;
      temperatureEl.textContent = `${data.current.temp_c}°C`;
      feelslikeEl.textContent = `Sensação: ${data.current.feelslike_c}°C`;
      humidityEl.textContent = data.current.humidity;
      windEl.textContent = `${data.current.wind_kph} km/h ${data.current.wind_dir}`;
      pressureEl.textContent = data.current.pressure_mb;
      airEl.textContent = data.current.air_quality.pm2_5
        ? data.current.air_quality.pm2_5.toFixed(1)
        : "N/A";
      lastUpdatedEl.textContent = `Atualizado em: ${data.current.last_updated}`;

      forecastEl.innerHTML = "";

      data.forecast.forecastday.forEach((day) => {
        const col = document.createElement("div");
        col.classList.add("col-md-2", "mb-3");

        col.innerHTML = `
            <div class="card text-center shadow-sm">
              <div class="card-body">
                <h6>${new Date(day.date).toLocaleDateString("pt-BR", {
                  weekday: "short",
                  day: "2-digit",
                })}</h6>
                <img src="https:${day.day.condition.icon}" alt="${
          day.day.condition.text
        }">
                <p class="mb-1">${day.day.condition.text}</p>
                <p>🌡️ ${day.day.mintemp_c}° - ${day.day.maxtemp_c}°C</p>
                <p>🌅 ${day.astro.sunrise}<br>🌇 ${day.astro.sunset}</p>
              </div>
            </div>
          `;

        forecastEl.appendChild(col);
      });
    })
    .catch(() => {
      alert("Erro ao carregar os dados");
    })
    .finally(() => {
      hideLoader();
    });
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

getWeather();
