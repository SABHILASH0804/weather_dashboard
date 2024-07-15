# weather_dashboard

## Objective

The objective of this project is to design and develop a dynamic weather dashboard using weather APIs. Students will fetch data from external APIs, present it in a user-friendly manner, and implement responsive design principles.

## Project Overview

This web application displays current weather information and a 5-day forecast for a user-specified location. It fetches data from the WeatherAPI, processes it, and presents it in a visually appealing way. The project incorporates best practices in UI/UX design to ensure functionality and user engagement.

## Features

- Current Weather Display: Shows temperature, humidity, wind speed, and weather conditions for the selected city.
- 5-Day Forecast: Displays maximum and minimum temperatures and weather conditions for each day in the forecast.
- Responsive Design: Ensures usability across various devices and screen sizes.

## Technologies Used

- HTML: Structuring the web page.
- CSS: Styling the application for a clean and modern look.
- JavaScript : Fetching data from the API and dynamically updating the UI.
- WeatherAPI: Providing weather data for the specified location.

## Instructions

1. Clone or download the repository.
2. Open `index.html` in your web browser.
3. Enter a city name and click 'Search' to view weather information.
4. The current weather and 5-day forecast will be displayed.

## Project Structure

- index.html: Main HTML file containing the structure of the weather dashboard.
- style.css: CSS file for styling the application.
- main.js: JavaScript file handling API requests, data processing, and UI updates.

## Prerequisites

1. Basic Knowledge of Web Development

HTML: Understanding the structure and syntax of HTML to create the layout of the web pages.
CSS: Ability to style HTML elements to create visually appealing designs and responsive layouts.
JavaScript: Knowledge of JavaScript to add interactivity and handle data fetching from APIs.

2. Familiarity with APIs

Understanding how to work with APIs, including sending HTTP requests and processing JSON responses.
Knowledge of how to use tools like Postman to test API endpoints.

3. Optional Framework Knowledge
React.js or Vue.js: Basic understanding of these JavaScript frameworks if you choose to use them for building the application. This includes knowledge of component-based architecture, state management, and lifecycle methods.

4. Internet Access
Reliable internet access for fetching weather data from external APIs.

5. API Key

6. Familiarity with Asynchronous JavaScript
Understanding of asynchronous programming concepts like Promises, async/await, and how to handle asynchronous operations in JavaScript.

7. Experience with CSS Frameworks
Familiarity with CSS frameworks like Bootstrap or Tailwind CSS for easier and faster styling of the application.

## Screenshot 
![Weather Dashboard Screenshot](images\output.png)

## codes

## index.html

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather Dashboard</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Weather Dashboard</h1>
            <form id="search-form">
                <input type="text" id="city" placeholder="Enter city name" required>
                <button type="submit">Search</button>
            </form>
        </header>
        <main>
            <fieldset>
                <legend><h2>Current Weather</h2></legend>
                <section id="current-weather">
                    <div id="weather-info"></div>
                </section>
            </fieldset>
            <br>
            <fieldset>
                <legend><h2>5-Day Forecast</h2></legend>
                <section id="forecast">
                    <div id="forecast-info"></div>
                </section>
            </fieldset>
        </main>
    </div>
    <script src="main.js"></script>
</body>
</html>


## main.js

// Weather API key and base URL
const API_KEY = 'ccb64d2855cc492d90994802240407'; 
const BASE_URL = 'http://api.weatherapi.com/v1/';

// Event listener for form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    getWeatherData(city);
});

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
    const currentWeatherUrl = `${BASE_URL}current.json?key=${API_KEY}&q=${city}`;
    const forecastUrl = `${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=5`;

    Promise.all([
        fetchWeatherData(currentWeatherUrl),
        fetchWeatherData(forecastUrl)
    ])
    .then(results => {
        const [currentWeatherData, forecastData] = results;
        displayCurrentWeather(currentWeatherData);
        displayForecast(forecastData);
    })
    .catch(error => {
        alert(error);
    });
}

// Function to display current weather information
function displayCurrentWeather(data) {
    const weatherInfo = `
        <p>Temperature: ${data.current.temp_c} °C</p>
        <p>Humidity: ${data.current.humidity} %</p>
        <p>Wind Speed: ${data.current.wind_kph} kph</p>
        <p>Weather: ${data.current.condition.text}</p>
    `;
    document.getElementById('weather-info').innerHTML = weatherInfo;
}

// Function to display 5-day forecast information
function displayForecast(data) {
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


## style.css

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    align-items: center;
}

.container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 1200px;
    text-align: center;
}

header {
    margin-bottom: 20px;
}

header h1 {
    margin: 0;
}

form {
    display: flex;
    justify-content: center;
    align-items: center;
}

input[type="text"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-right: 10px;
    width: 70%;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #007BFF;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

section {
    margin-top: 20px;
}

section h2 {
    margin-bottom: 10px;
}

#weather-info, #forecast-info {
    text-align: left;
}
