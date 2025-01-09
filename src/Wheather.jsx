import React, { useState } from 'react';
import clouds from './assets/clouds.png';
import clear from './assets/clear.png';
import rain from './assets/rain.png';
import drizzle from './assets/drizzle.png';
import mist from './assets/mist.png';
import snow from './assets/snow.png';
import windIcon from './assets/wind.png';
import humidityIcon from './assets/humidity.png';

const Wheather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const APIURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const APIKEY = "247c7ef0d59fef78158bf8a363304ab2";

  const fetchWeather = async (city) => {
    try {
      const response = await fetch(APIURL + city + "&appid=" + APIKEY);
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clouds":
        return clouds;
      case "Clear":
        return clear;
      case "Rain":
        return rain;
      case "Drizzle":
        return drizzle;
      case "Mist":
        return mist;
      default:
        return clear;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 flex flex-col justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Weather App</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => fetchWeather(city)}
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-4 hover:bg-blue-600 transition"
        >
          Get Weather
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {weatherData && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">{weatherData.name}</h2>
            <img
              src={getWeatherIcon(weatherData.weather[0].main)}
              alt="weather icon"
              className="mx-auto my-4 w-32 h-32"
            />
            <p className="text-lg text-gray-700">{Math.round(weatherData.main.temp)}°C</p>
            <p className="text-sm text-gray-500">{weatherData.weather[0].description}</p>

            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center">
                <img src={humidityIcon} alt="humidity icon" className="w-6 h-6 mr-2" />
                <p className="text-gray-700">Humidity: {weatherData.main.humidity}%</p>
              </div>

              <div className="flex items-center">
                <img src={windIcon} alt="wind icon" className="w-6 h-6 mr-2" />
                <p className="text-gray-700">Wind Speed: {weatherData.wind.speed} km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wheather;
