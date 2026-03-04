// Get DOM elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cityChips = document.querySelectorAll('.city-chip');

// API key from config.js
const API_KEY = WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Update last updated date
document.getElementById('last-updated').textContent = new Date().toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Event listeners
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

// City chips click handlers
cityChips.forEach(chip => {
    chip.addEventListener('click', () => {
        const city = chip.getAttribute('data-city');
        cityInput.value = city;
        getWeatherData(city);
    });
});

// Main function to fetch weather data
async function getWeatherData(city) {
    try {
        // Show loading state
        showLoading();

        // Try with Kenya first, then fallback to regular
        let url = `${BASE_URL}?q=${city},KE&appid=${API_KEY}&units=metric`;
        let response = await fetch(url);
        
        // If Kenya fails, try without country code
        if (!response.ok) {
            url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
            response = await fetch(url);
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'City not found');
        }

        const data = await response.json();
        displayWeatherData(data);

    } catch (error) {
        showError(error.message);
    }
}

// Show loading spinner
function showLoading() {
    weatherInfo.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Fetching weather data...</p>
        </div>
    `;
    errorMessage.style.display = 'none';
}

// Display weather data
function displayWeatherData(data) {
    const { name, sys } = data;
    const { temp, feels_like, humidity, pressure } = data.main;
    const { speed } = data.wind;
    const { description, icon } = data.weather[0];

    // Format date
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-KE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const weatherHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <h2>${name}, ${sys.country}</h2>
                <p class="date">${dateStr}</p>
            </div>
            
            <div class="weather-main">
                <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="${description}">
                <div class="temperature">${Math.round(temp)}°C</div>
                <p class="description">${description}</p>
            </div>
            
            <div class="weather-details">
                <div class="detail-card">
                    <i class="fas fa-temperature-high"></i>
                    <p>Feels Like</p>
                    <h3>${Math.round(feels_like)}°C</h3>
                </div>
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
                <div class="detail-card">
                    <i class="fas fa-compress"></i>
                    <p>Pressure</p>
                    <h3>${pressure} hPa</h3>
                </div>
            </div>
        </div>
    `;

    weatherInfo.innerHTML = weatherHTML;
    errorMessage.style.display = 'none';
}

// Show error message
function showError(message) {
    weatherInfo.innerHTML = `
        <div class="error-container">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
            <button class="btn-retry" onclick="retrySearch()">
                <i class="fas fa-redo"></i>
                Try Again
            </button>
        </div>
    `;
    errorMessage.style.display = 'none';
}

// Retry function
function retrySearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        // Reset to welcome screen
        weatherInfo.innerHTML = `
            <div class="welcome-message">
                <i class="fas fa-map-marker-alt"></i>
                <h3>Search for a city</h3>
                <p>Enter a city name above to see current weather</p>
            </div>
        `;
    }
}

// Clear input on page load
window.addEventListener('load', () => {
    cityInput.value = '';
});