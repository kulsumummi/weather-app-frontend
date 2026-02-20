# Weather App

A modern, glassmorphism-styled weather application built with React, Vite, and Tailwind CSS.

## Prerequisites

- **Node.js**: You need to have Node.js installed on your computer to run this project. You can download it from [nodejs.org](https://nodejs.org/).

## Setup Instructions

1.  **Install Dependencies**
    Open your terminal in this directory and run:
    ```bash
    npm install
    ```

2.  **Run the Development Server**
    Start the application with:
    ```bash
    npm run dev
    ```

3.  **Open in Browser**
    The terminal will show a local URL (usually `http://localhost:5173`). Open this link in your web browser.

## Features

- **Current Weather**: detailed view with temperature, humidity, wind, pressure, and more.
- **5-Day Forecast**: upcoming weather predictions.
- **Glassmorphism Design**: modern, translucent UI.
- **City Search**: search for weather in any city globally.

## API Key

The project is pre-configured with a demo OpenWeatherMap API key in the `.env` file.
```env
VITE_WEATHER_API_KEY=530f12816b5502250140cc331e738a5e
```
If this key stops working, you can replace it with your own from [OpenWeatherMap](https://openweathermap.org/api).
