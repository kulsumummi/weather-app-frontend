import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-md mx-auto mb-8">
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search for a city..."
                    className="glass-input pr-12"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button
                    type="submit"
                    className="absolute right-2 p-2 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                >
                    <Search size={20} />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
