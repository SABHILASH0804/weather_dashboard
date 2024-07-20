const API_KEY = '7471661b0c0f4b55981142701241907';
const BASE_URL = 'https://api.weatherapi.com/v1/';

// Function to fetch weather data from API
function fetchWeatherData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                return Promise.reject('City not found');
            }
            return response.json();
        });
}

// Function to get current weather and forecast for a city
function getWeatherData(city) {
    console.log(`Fetching weather data for ${city}`);
    const currentWeatherUrl = `${BASE_URL}current.json?key=${API_KEY}&q=${city}`;
    const forecastUrl = `${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=5`;

    Promise.all([
        fetchWeatherData(currentWeatherUrl),
        fetchWeatherData(forecastUrl)
    ])
    .then(results => {
        const [currentWeatherData, forecastData] = results;
        displayCurrentWeather(currentWeatherData, city);
        displayForecast(forecastData);
    })
    .catch(error => {
        alert(error);
    });
}

// Function to display current weather information
function displayCurrentWeather(data, city) {
    console.log('Displaying current weather data');
    const weatherInfo = `
        <p>City: ${city}</p>
        <p>Temperature: ${data.current.temp_c} °C</p>
        <p>Humidity: ${data.current.humidity} %</p>
        <p>Wind Speed: ${data.current.wind_kph} kph</p>
        <p>Weather: ${data.current.condition.text}</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}

// Function to display 5-day forecast information
function displayForecast(data) {
    console.log('Displaying forecast data');
    const forecastContainer = document.getElementById('forecast-info');
    forecastContainer.innerHTML = ''; // Clear previous forecast data

    data.forecast.forecastday.forEach((day, index) => {
        const dayNumber = index + 1;
        const forecastSection = document.createElement('div');
        forecastSection.classList.add('forecast-section');

        const forecastContent = `
            <h3>Day ${dayNumber}</h3>
            <p>Date: ${day.date}</p>
            <p>Max Temp: ${day.day.maxtemp_c} °C</p>
            <p>Min Temp: ${day.day.mintemp_c} °C</p>
            <p>Weather: ${day.day.condition.text}</p>
        `;

        forecastSection.innerHTML = forecastContent;
        forecastContainer.appendChild(forecastSection);
    });
}

// Initial load - show weather for Kerala
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event triggered');
    getWeatherData('Kerala');
});

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    getWeatherData(city);
});

