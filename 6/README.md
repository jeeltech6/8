# Weather App

A responsive weather application that shows real-time weather information based on the user's location.

## Features

- Automatic location detection using geolocation
- Fallback to IP-based location if geolocation is denied
- Display of current temperature, humidity, and wind speed
- Weather condition description with corresponding icon
- Responsive design that works on all devices
- Loading states for better user experience

## Technologies Used

- HTML5 Geolocation API
- OpenWeatherMap API for weather data
- IP Geolocation API (ipapi.co) as fallback
- CSS3 with modern design practices
- Vanilla JavaScript with async/await

## How It Works

1. The app first attempts to get the user's location using the browser's Geolocation API
2. If successful, it uses the coordinates to fetch weather data from OpenWeatherMap
3. If geolocation is denied, it falls back to IP-based location detection
4. Weather data is displayed with a clean, modern interface
5. Users can refresh the data at any time using the refresh button

## Implementation Details

- Uses async/await for clean asynchronous code
- Implements error handling for all API calls
- Provides visual feedback during loading states
- Responsive design works on mobile and desktop

## API Keys

The app uses the following API:
- OpenWeatherMap API (requires API key)

## Setup

1. Clone the repository
2. Replace the API key in script.js with your own OpenWeatherMap API key
3. Open index.html in a modern web browser

## Error Handling

- Handles geolocation permission denial
- Manages API fetch failures
- Provides user feedback for all error states

## Future Improvements

- Add weather forecast for upcoming days
- Implement city search functionality
- Add more weather details
- Save user's last location
- Add unit conversion (Celsius/Fahrenheit)
