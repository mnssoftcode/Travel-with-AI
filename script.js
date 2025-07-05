// City data with coordinates, attractions, and details
const cities = [
    {
        name: "Delhi",
        description: "Capital city, rich in history and culture",
        coordinates: { lat: 28.7041, lng: 77.1025 },
        attractions: [
            "Red Fort", "Qutub Minar", "India Gate", "Humayun's Tomb",
            "Lotus Temple", "Akshardham Temple", "Chandni Chowk"
        ],
        type: "Cultural",
        bestTime: "October to March"
    },
    {
        name: "Mumbai",
        description: "The city of dreams, famous for Bollywood and beaches",
        coordinates: { lat: 19.0760, lng: 72.8777 },
        attractions: [
            "Gateway of India", "Marine Drive", "Juhu Beach", "Elephanta Caves",
            "Bandra-Worli Sea Link", "Colaba Causeway", "Film City"
        ],
        type: "Entertainment",
        bestTime: "October to February"
    },
    {
        name: "Goa",
        description: "Best for beaches, parties, and relaxation",
        coordinates: { lat: 15.2993, lng: 74.1240 },
        attractions: [
            "Calangute Beach", "Baga Beach", "Fort Aguada", "Basilica of Bom Jesus",
            "Dudhsagar Falls", "Anjuna Flea Market", "Old Goa Churches"
        ],
        type: "Beach/Relaxation",
        bestTime: "November to March"
    },
    {
        name: "Jaipur",
        description: "The Pink City, known for forts and palaces",
        coordinates: { lat: 26.9124, lng: 75.7873 },
        attractions: [
            "Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar",
            "Nahargarh Fort", "Jaigarh Fort", "Albert Hall Museum"
        ],
        type: "Heritage",
        bestTime: "October to March"
    },
    {
        name: "Manali",
        description: "Adventure and scenic beauty in the Himalayas",
        coordinates: { lat: 32.2432, lng: 77.1892 },
        attractions: [
            "Solang Valley", "Hadimba Temple", "Rohtang Pass", "Mall Road",
            "Beas River", "Manu Temple", "Vashisht Hot Springs"
        ],
        type: "Adventure",
        bestTime: "March to June, October to December"
    },
    {
        name: "Kerala",
        description: "God's Own Country, famous for backwaters and greenery",
        coordinates: { lat: 10.8505, lng: 76.2711 },
        attractions: [
            "Alleppey Backwaters", "Munnar Tea Gardens", "Kovalam Beach",
            "Periyar Wildlife Sanctuary", "Fort Kochi", "Kumarakom", "Thekkady"
        ],
        type: "Nature",
        bestTime: "September to March"
    },
    {
        name: "Varanasi",
        description: "Spiritual capital, sacred city on the Ganges",
        coordinates: { lat: 25.3176, lng: 82.9739 },
        attractions: [
            "Ghats of Varanasi", "Kashi Vishwanath Temple", "Sarnath",
            "Dashashwamedh Ghat", "Manikarnika Ghat", "Banaras Hindu University"
        ],
        type: "Spiritual",
        bestTime: "October to March"
    },
    {
        name: "Udaipur",
        description: "City of Lakes, romantic and picturesque",
        coordinates: { lat: 24.5854, lng: 73.7125 },
        attractions: [
            "Lake Palace", "City Palace", "Jag Mandir", "Fateh Sagar Lake",
            "Saheliyon Ki Bari", "Monsoon Palace", "Bagore Ki Haveli"
        ],
        type: "Romantic",
        bestTime: "September to March"
    }
];

// Weather API simulation (replace with real API later)
const weatherData = {
    "Delhi": { current: { temp: 32, condition: "Sunny", humidity: 45 }, forecast: [28, 30, 29, 31, 33, 32, 30] },
    "Mumbai": { current: { temp: 29, condition: "Cloudy", humidity: 78 }, forecast: [27, 28, 29, 30, 29, 28, 27] },
    "Goa": { current: { temp: 31, condition: "Partly Cloudy", humidity: 82 }, forecast: [30, 31, 32, 31, 30, 29, 28] },
    "Jaipur": { current: { temp: 35, condition: "Sunny", humidity: 40 }, forecast: [33, 34, 35, 36, 35, 34, 33] },
    "Manali": { current: { temp: 18, condition: "Clear", humidity: 65 }, forecast: [16, 17, 18, 19, 18, 17, 16] },
    "Kerala": { current: { temp: 27, condition: "Rainy", humidity: 85 }, forecast: [26, 27, 28, 27, 26, 25, 26] },
    "Varanasi": { current: { temp: 33, condition: "Sunny", humidity: 50 }, forecast: [31, 32, 33, 34, 33, 32, 31] },
    "Udaipur": { current: { temp: 30, condition: "Clear", humidity: 55 }, forecast: [28, 29, 30, 31, 30, 29, 28] }
};

// Distance calculation (simplified - replace with Google Maps API)
function calculateDistance(fromCity, toCity) {
    const R = 6371; // Earth's radius in km
    const lat1 = fromCity.coordinates.lat * Math.PI / 180;
    const lat2 = toCity.coordinates.lat * Math.PI / 180;
    const deltaLat = (toCity.coordinates.lat - fromCity.coordinates.lat) * Math.PI / 180;
    const deltaLng = (toCity.coordinates.lng - fromCity.coordinates.lng) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return Math.round(R * c);
}

// Cost estimation
function estimateCost(distance, cityType) {
    const baseCost = {
        "Cultural": 15000,
        "Entertainment": 20000,
        "Beach/Relaxation": 18000,
        "Heritage": 16000,
        "Adventure": 25000,
        "Nature": 17000,
        "Spiritual": 12000,
        "Romantic": 22000
    };

    const distanceCost = distance * 2; // ₹2 per km
    const accommodationCost = baseCost[cityType] || 15000;
    const foodCost = 3000; // Daily food cost
    const activitiesCost = 5000; // Activities and sightseeing

    return {
        total: distanceCost + accommodationCost + foodCost + activitiesCost,
        breakdown: {
            travel: distanceCost,
            accommodation: accommodationCost,
            food: foodCost,
            activities: activitiesCost
        }
    };
}

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    displayCities();
});

// Display cities in the grid
function displayCities() {
    const citiesGrid = document.getElementById('citiesGrid');
    citiesGrid.innerHTML = '';

    cities.forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.className = 'city-card';
        cityCard.onclick = () => selectCity(city.name);
        
        cityCard.innerHTML = `
            <h3>${city.name}</h3>
            <p>${city.description}</p>
            <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #4f46e5;">
                <i class="fas fa-map-marker-alt"></i> ${city.type}
            </div>
        `;
        
        citiesGrid.appendChild(cityCard);
    });
}

// Select a city and show details
function selectCity(cityName) {
    const city = cities.find(c => c.name === cityName);
    if (!city) return;

    // Show city details section
    document.querySelector('.city-selection').style.display = 'none';
    document.getElementById('cityDetails').style.display = 'block';
    document.getElementById('selectedCityName').textContent = city.name;

    // Load city data
    loadWeatherData(city);
    loadDistanceAndCost(city);
    loadAttractions(city);
}

// Hide city details and go back to city selection
function hideCityDetails() {
    document.querySelector('.city-selection').style.display = 'block';
    document.getElementById('cityDetails').style.display = 'none';
}

// Load weather data
function loadWeatherData(city) {
    const weather = weatherData[city.name];
    if (!weather) return;

    // Current weather
    const currentWeatherDiv = document.getElementById('currentWeather');
    currentWeatherDiv.innerHTML = `
        <div class="weather-info">
            <div class="weather-icon">
                <i class="fas fa-sun"></i>
            </div>
            <div class="weather-details">
                <h4>${weather.current.temp}°C</h4>
                <p>${weather.current.condition}</p>
                <p>Humidity: ${weather.current.humidity}%</p>
            </div>
        </div>
    `;

    // Weather forecast
    const forecastDiv = document.getElementById('weatherForecast');
    const days = ['Today', 'Tomorrow', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    let forecastHTML = '<div style="margin-bottom: 1rem;"><strong>7-Day Forecast:</strong></div>';
    
    weather.forecast.forEach((temp, index) => {
        forecastHTML += `
            <div class="forecast-item">
                <span class="forecast-day">${days[index]}</span>
                <span class="forecast-temp">${temp}°C</span>
            </div>
        `;
    });
    
    forecastHTML += `
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <strong>Monthly Prediction:</strong><br>
            <small>Based on historical data, ${city.name} typically experiences ${getMonthlyPrediction(city.name)} during this season.</small>
        </div>
    `;
    
    forecastDiv.innerHTML = forecastHTML;
}

// Get monthly weather prediction
function getMonthlyPrediction(cityName) {
    const predictions = {
        "Delhi": "hot and dry weather with temperatures ranging from 25-35°C",
        "Mumbai": "warm and humid weather with occasional rain, temperatures 25-30°C",
        "Goa": "pleasant weather with moderate humidity, temperatures 25-32°C",
        "Jaipur": "hot and dry weather, temperatures 28-38°C",
        "Manali": "cool and pleasant weather, temperatures 15-25°C",
        "Kerala": "moderate rainfall and humidity, temperatures 24-30°C",
        "Varanasi": "hot weather with moderate humidity, temperatures 28-35°C",
        "Udaipur": "pleasant weather with moderate temperatures, 25-32°C"
    };
    return predictions[cityName] || "moderate weather conditions";
}

// Load distance and cost information
function loadDistanceAndCost(city) {
    const distanceCostDiv = document.getElementById('distanceCost');
    
    // Calculate distance from Delhi (as reference point)
    const delhi = cities.find(c => c.name === "Delhi");
    const distance = calculateDistance(delhi, city);
    const cost = estimateCost(distance, city.type);
    
    distanceCostDiv.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <strong>Distance from Delhi:</strong> ${distance} km
        </div>
        <div style="margin-bottom: 1rem;">
            <strong>Estimated Total Cost:</strong> ₹${cost.total.toLocaleString()}
        </div>
        <div style="font-size: 0.9rem;">
            <strong>Cost Breakdown:</strong><br>
            • Travel: ₹${cost.breakdown.travel.toLocaleString()}<br>
            • Accommodation: ₹${cost.breakdown.accommodation.toLocaleString()}<br>
            • Food: ₹${cost.breakdown.food.toLocaleString()}<br>
            • Activities: ₹${cost.breakdown.activities.toLocaleString()}
        </div>
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <strong>Best Time to Visit:</strong> ${city.bestTime}
        </div>
    `;
}

// Load attractions
function loadAttractions(city) {
    const attractionsDiv = document.getElementById('attractions');
    let attractionsHTML = '';
    
    city.attractions.forEach(attraction => {
        attractionsHTML += `
            <div class="attraction-item">
                <div class="attraction-icon">
                    <i class="fas fa-star"></i>
                </div>
                <div class="attraction-name">${attraction}</div>
            </div>
        `;
    });
    
    attractionsHTML += `
        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5e7eb;">
            <strong>City Type:</strong> ${city.type}<br>
            <strong>Recommended Duration:</strong> 3-5 days
        </div>
    `;
    
    attractionsDiv.innerHTML = attractionsHTML;
} 