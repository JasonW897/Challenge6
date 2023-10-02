const API_KEY = '9f66a79acdc94e6aea3ed31699daa3a4';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeatherData(city);
});

function getWeatherData(city) {
    fetch(`${API_URL}weather?q=${city}&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            displayCurrentWeather(data);
            fetch(`${API_URL}forecast?q=${city}&appid=${API_KEY}`)
                .then((response) => response.json())
                .then((forecastData) => {
                    displayForecast(forecastData);
                })
                .catch((error) => {
                    console.error('Error fetching forecast data:', error);
                });
        
            updateSearchHistory(data.name);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            alert('City not found or there was an error fetching data.');
        });
}

function displayCurrentWeather(data) {

    document.getElementById('city-name').textContent = data.name;
    document.getElementById('date').textContent = new Date(data.dt * 1000).toLocaleDateString();
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    document.getElementById('temperature').textContent = (data.main.temp - 273.15).toFixed(2);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;
}

function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-data');
    forecastContainer.innerHTML = ''; 
    for (let i = 0; i < forecastData.list.length; i++) {
        const forecast = forecastData.list[i];
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString();
        const forecastIcon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('col-md-2', 'mb-3');
        forecastItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p>Date: ${forecastDate}</p>
                    <p>Weather: <img src="${forecastIcon}" alt="Weather Icon"></p>
                    <p>Temperature: ${(forecast.main.temp - 273.15).toFixed(2)}&deg;C</p>
                    <p>Humidity: ${forecast.main.humidity}%</p>
                    <p>Wind Speed: ${forecast.wind.speed} m/s</p>
                </div>
            </div>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

function updateSearchHistory(city) {
    const searchHistoryList = document.getElementById('search-history-list');
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = city;
    listItem.addEventListener('click', () => {
        getWeatherData(city);
    });
    searchHistoryList.appendChild(listItem);
}
