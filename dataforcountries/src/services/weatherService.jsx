import { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherData = ({ city }) => {
  const api_key = import.meta.env.VITE_WEATHER_API_KEY
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Clima en {city}</h2>
          <div>Temperatura {weather.main.temp}°C</div>
          <img
            
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>Wind {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  );
};

export default WeatherData;