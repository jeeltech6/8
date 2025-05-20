const API_KEY = 'dc1d2c1ee532874a6d84e020d0df1fbb';

// Get user's location and fetch weather
function getLocation() {
    if (navigator.geolocation) {
        document.getElementById('location').textContent = 'Getting location...';
        navigator.geolocation.getCurrentPosition(position => {
            fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        }, error => {
            document.getElementById('location').textContent = 'Location access denied';
            // Fallback to IP-based location
            fetchWeatherByIP();
        });
    } else {
        document.getElementById('location').textContent = 'Geolocation not supported';
        fetchWeatherByIP();
    }
}

async function fetchWeatherByIP() {
    try {
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        fetchWeatherByCoords(ipData.latitude, ipData.longitude);
    } catch (error) {
        document.getElementById('location').textContent = 'Failed to get location';
    }
}

async function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        document.getElementById('location').textContent = 'Failed to fetch weather data';
    }
}

function updateWeather(data) {
    // Update location and weather description
    document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description.charAt(0).toUpperCase() + 
        data.weather[0].description.slice(1);

    // Update weather metrics
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind').textContent = `Wind: ${data.wind.speed} m/s`;

    // Update weather icon
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">`;
    
    // Reset button state
    setButtonLoading(false);
}

// Add loading state to button
function setButtonLoading(loading) {
    const button = document.getElementById('refreshBtn');
    button.textContent = loading ? 'Loading...' : 'Refresh';
    button.disabled = loading;
}

document.getElementById('refreshBtn').addEventListener('click', () => {
    setButtonLoading(true);
    getLocation();
});

// Initial fetch
getLocation();
