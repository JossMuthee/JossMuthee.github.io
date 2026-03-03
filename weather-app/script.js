// Get DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

// YOUR WORKING API KEY
const API_KEY = '73a724e23e078c772fe2d67a19984302';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        showError('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

async function getWeatherData(city) {
    try {
        // Show loading
        weatherInfo.innerHTML = '<div class="loading">Loading...</div>';
        errorMessage.style.display = 'none';

        // Build the URL exactly like your working browser test
        const url = `${BASE_URL}?q=${city},KE&appid=${API_KEY}&units=metric`;
        
        console.log('Fetching:', url); // This helps debug

        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'City not found');
        }

        const data = await response.json();
        displayWeatherData(data);

    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
    }
}

function displayWeatherData(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];

    const weatherHTML = `
        <h2>${name}</h2>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <div class="temp">${Math.round(temp)}°C</div>
        <p class="description">${description}</p>
        
        <div class="weather-details">
            <div class="detail-card">
                <i class="fas fa-tint"></i>
                <p>Humidity</p>
                <h3>${humidity}%</h3>
            </div>
            <div class="detail-card">
                <i class="fas fa-wind"></i>
                <p>Wind Speed</p>
                <h3>${speed} km/h</h3>
            </div>
        </div>
    `;

    weatherInfo.innerHTML = weatherHTML;
}

function showError(message) {
    weatherInfo.innerHTML = '';
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}