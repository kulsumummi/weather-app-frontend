import React from 'react';

const ForecastCard = ({ forecast }) => {
    if (!forecast) return null;

    // Filter to get one forecast per day (e.g., at 12:00 PM)
    const dailyForecast = forecast.list.filter((reading) =>
        reading.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    return (
        <div className="w-full">
            <h3 className="text-2xl font-bold mb-6 pl-2">5-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {dailyForecast.map((day) => (
                    <div key={day.dt} className="glass-card p-4 flex flex-col items-center justify-center text-center transform hover:scale-105 transition-transform duration-300">
                        <p className="font-medium mb-2">{formatDate(day.dt_txt)}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                            alt={day.weather[0].description}
                            className="w-16 h-16 my-2 drop-shadow-md"
                        />
                        <p className="text-xl font-bold mb-1">{Math.round(day.main.temp)}°C</p>
                        <p className="text-sm opacity-70 capitalize">{day.weather[0].description}</p>
                        <div className="mt-3 text-xs opacity-60 w-full flex justify-between px-2">
                            <span>🌧 {Math.round(day.pop * 100)}%</span>
                            <span>💨 {Math.round(day.wind.speed)}m/s</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ForecastCard;
