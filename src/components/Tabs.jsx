import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: 'current', label: 'Current Weather' },
        { id: 'forecast', label: '5-Day Forecast' },
    ];

    return (
        <div className="flex space-x-2 mb-6 justify-center">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeTab === tab.id
                            ? 'bg-white text-blue-600 shadow-lg scale-105'
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
