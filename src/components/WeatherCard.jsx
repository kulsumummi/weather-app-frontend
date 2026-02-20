import React from 'react';
import { Cloud, Droplets, Wind, Thermometer, Sun, Sunset, Sunrise } from 'lucide-react';

const WeatherCard = ({ weather }) => {
    if (!weather) return null;

    const {
        name,
        main: { temp, humidity, pressure, feels_like },
        weather: [condition],
        wind: { speed },
        sys: { sunrise, sunset },
    } = weather;

    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="glass-card p-8 w-full animate-fade-in relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20">
                <Sun size={120} />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 z-10 relative">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-2">{name}</h2>
                    <p className="text-xl capitalize opacity-90">{condition.description}</p>
                </div>
                <div className="text-center mt-4 md:mt-0">
                    <h1 className="text-7xl font-bold flex items-start">
                        {Math.round(temp)}<span className="text-3xl mt-2">°C</span>
                    </h1>
                    <p className="opacity-80 mt-1">Feels like {Math.round(feels_like)}°C</p>
                </div>
                <div className="mt-4 md:mt-0 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <img
                        src={`https://openweathermap.org/img/wn/${condition.icon}@4x.png`}
                        alt={condition.description}
                        className="w-24 h-24 drop-shadow-lg"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="glass p-4 rounded-xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors">
                    <Droplets className="mb-2 text-blue-300" size={24} />
                    <p className="text-sm opacity-70">Humidity</p>
                    <p className="text-lg font-semibold">{humidity}%</p>
                </div>
                <div className="glass p-4 rounded-xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors">
                    <Wind className="mb-2 text-gray-300" size={24} />
                    <p className="text-sm opacity-70">Wind Speed</p>
                    <p className="text-lg font-semibold">{speed} m/s</p>
                </div>
                <div className="glass p-4 rounded-xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors">
                    <Thermometer className="mb-2 text-red-300" size={24} />
                    <p className="text-sm opacity-70">Pressure</p>
                    <p className="text-lg font-semibold">{pressure} hPa</p>
                </div>
                <div className="glass p-4 rounded-xl flex flex-col items-center justify-center hover:bg-white/20 transition-colors">
                    <Sunrise className="mb-2 text-yellow-300" size={24} />
                    <p className="text-sm opacity-70">Sunrise</p>
                    <p className="text-lg font-semibold">{formatTime(sunrise)}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
