import React, { useState, useEffect } from 'react';
import { weatherService } from './services/api';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Tabs from './components/Tabs';
import { Loader2, AlertCircle } from 'lucide-react';

function App() {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('current');

    const fetchWeatherData = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const weatherData = await weatherService.getCurrentWeather(city);
            const forecastData = await weatherService.getForecast(city);
            setWeather(weatherData);
            setForecast(forecastData);
        } catch (err) {
            if (err.response) {
                if (err.response.status === 404) {
                    setError('City not found. Please try again.');
                } else if (err.response.status === 401) {
                    setError('Invalid API Key. Please check your .env file.');
                } else {
                    setError('Failed to fetch weather data. Please check your connection.');
                }
            } else {
                setError('Network error. Please check your connection.');
            }
            setWeather(null);
            setForecast(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch for a default city
        fetchWeatherData('New Delhi');
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center">
            <header className="mb-8 text-center animate-fade-in-down">
                <h1 className="text-5xl font-bold mb-2 drop-shadow-md tracking-tight">WeatherLens</h1>
                <p className="text-xl text-white/90 font-light">Your window to the world's weather</p>
            </header>

            <SearchBar onSearch={fetchWeatherData} />

            <main className="w-full max-w-4xl min-h-[500px] flex flex-col items-center">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <Loader2 className="animate-spin text-white mb-4" size={48} />
                        <p className="text-xl animate-pulse">Fetching forecast...</p>
                    </div>
                ) : error ? (
                    <div className="glass p-8 text-center text-red-100 bg-red-500/20 border-red-500/30 w-full max-w-md animate-shake">
                        <AlertCircle className="mx-auto mb-4" size={48} />
                        <p className="text-xl font-medium">{error}</p>
                    </div>
                ) : (
                    weather && (
                        <>
                            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                            <div className="w-full transition-all duration-500 ease-in-out">
                                {activeTab === 'current' ? (
                                    <WeatherCard weather={weather} />
                                ) : (
                                    <ForecastCard forecast={forecast} />
                                )}
                            </div>
                        </>
                    )
                )}
            </main>

            <footer className="mt-auto py-8 text-white/50 text-sm">
                <p>© 2024 WeatherLens • Powered by OpenWeatherMap</p>
            </footer>
        </div>
    );
}

export default App;
