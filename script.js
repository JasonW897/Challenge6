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
       
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('date').textContent = new Date(data.dt * 1000).toLocaleDateString();
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
            document.getElementById('temperature').textContent = (data.main.temp - 273.15).toFixed(2);
            document.getElementById('humidity').textContent = data.main.humidity;
            document.getElementById('wind-speed').textContent = data.wind.speed;

           
            updateSearchHistory(data.name);
        })
        .catch((error) => {
            console.error('Error fetching weather data:', error);
            alert('City not found or there was an error fetching data.');
        });
}


function updateSearchHistory(city) {
    const searchHistoryList = document.getElementById('search-history').querySelector('ul');
    const listItem = document.createElement('li');
    listItem.textContent = city;
    
  
    listItem.addEventListener('click', () => {
        getWeatherData(city);
    });

    searchHistoryList.appendChild(listItem);
}
