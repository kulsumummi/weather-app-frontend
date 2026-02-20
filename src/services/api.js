import axios from 'axios';

// Open-Meteo doesn't need an API Key
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Helper to map WMO codes to OpenWeatherMap icon codes & descriptions
const getWeatherCondition = (wmoCode, isDay = 1) => {
    const codes = {
        0: { description: 'Clear sky', icon: isDay ? '01d' : '01n' },
        1: { description: 'Mainly clear', icon: isDay ? '02d' : '02n' },
        2: { description: 'Partly cloudy', icon: isDay ? '03d' : '03n' },
        3: { description: 'Overcast', icon: '04d' },
        45: { description: 'Fog', icon: '50d' },
        48: { description: 'Depositing rime fog', icon: '50d' },
        51: { description: 'Light drizzle', icon: '09d' },
        53: { description: 'Moderate drizzle', icon: '09d' },
        55: { description: 'Dense drizzle', icon: '09d' },
        61: { description: 'Slight rain', icon: '10d' },
        63: { description: 'Moderate rain', icon: '10d' },
        65: { description: 'Heavy rain', icon: '10d' },
        71: { description: 'Slight snow', icon: '13d' },
        73: { description: 'Moderate snow', icon: '13d' },
        75: { description: 'Heavy snow', icon: '13d' },
        77: { description: 'Snow grains', icon: '13d' },
        80: { description: 'Slight rain showers', icon: '09d' },
        81: { description: 'Moderate rain showers', icon: '09d' },
        82: { description: 'Violent rain showers', icon: '09d' },
        95: { description: 'Thunderstorm', icon: '11d' },
        96: { description: 'Thunderstorm with hail', icon: '11d' },
        99: { description: 'Thunderstorm with heavy hail', icon: '11d' },
    };
    return codes[wmoCode] || { description: 'Unknown', icon: '03d' };
};

export const weatherService = {
    // 1. Get Coordinates for City
    getCoordinates: async (city) => {
        try {
            const response = await axios.get(GEO_API_URL, {
                params: {
                    name: city,
                    count: 1,
                    language: 'en',
                    format: 'json',
                },
            });
            if (!response.data.results || response.data.results.length === 0) {
                throw new Error('City not found');
            }
            return response.data.results[0];
        } catch (error) {
            throw error;
        }
    },

    // 2. Get Current Weather (Adapted Structure)
    getCurrentWeather: async (city) => {
        try {
            const location = await weatherService.getCoordinates(city);
            const { latitude, longitude, name, country } = location;

            const response = await axios.get(WEATHER_API_URL, {
                params: {
                    latitude,
                    longitude,
                    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m',
                    daily: 'sunrise,sunset', // Needed for sunrise/sunset
                    timezone: 'auto',
                    forecast_days: 1
                },
            });

            const current = response.data.current;
            const daily = response.data.daily;
            const condition = getWeatherCondition(current.weather_code, current.is_day);

            // Map to OWM structure
            return {
                name: name,
                sys: {
                    country: country,
                    sunrise: new Date(daily.sunrise[0]).getTime() / 1000,
                    sunset: new Date(daily.sunset[0]).getTime() / 1000,
                },
                main: {
                    temp: current.temperature_2m,
                    feels_like: current.apparent_temperature,
                    humidity: current.relative_humidity_2m,
                    pressure: current.surface_pressure,
                },
                weather: [
                    {
                        main: condition.description,
                        description: condition.description,
                        icon: condition.icon,
                    },
                ],
                wind: {
                    speed: current.wind_speed_10m / 3.6, // Convert km/h to m/s
                },
                dt: new Date(current.time).getTime() / 1000,
            };
        } catch (error) {
            throw error;
        }
    },

    // 3. Get Forecast (Adapted Structure)
    getForecast: async (city) => {
        try {
            const location = await weatherService.getCoordinates(city);
            const { latitude, longitude } = location;

            const response = await axios.get(WEATHER_API_URL, {
                params: {
                    latitude,
                    longitude,
                    hourly: 'temperature_2m,weather_code,wind_speed_10m,precipitation_probability',
                    timezone: 'auto',
                },
            });

            const hourly = response.data.hourly;
            const list = [];

            // Open-Meteo returns arrays of data, we need to map them to objects
            // Hourly data usually comes in 168 hours (7 days). We take every 3rd hour to simulate 3-hr blocks.
            for (let i = 0; i < hourly.time.length; i += 3) {
                const isDay = 1; // Simplified, assuming day icons for forecast list
                const condition = getWeatherCondition(hourly.weather_code[i], isDay);

                list.push({
                    dt: new Date(hourly.time[i]).getTime() / 1000,
                    dt_txt: hourly.time[i].replace('T', ' ') + ':00', // Format: "2024-03-20 12:00"
                    main: {
                        temp: hourly.temperature_2m[i],
                        feels_like: hourly.temperature_2m[i],
                        humidity: 80, // Mocked as it's not in this simple hourly call
                    },
                    weather: [
                        {
                            description: condition.description,
                            icon: condition.icon,
                        }
                    ],
                    wind: {
                        speed: hourly.wind_speed_10m[i] / 3.6,
                    },
                    pop: (hourly.precipitation_probability[i] || 0) / 100
                });
            }

            return {
                list: list
            };

        } catch (error) {
            throw error;
        }
    },
};
