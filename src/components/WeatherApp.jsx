import { useEffect, useState } from "react";
import axios from "axios";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState(null); 
    const apiKey = import.meta.env.VITE_API_KEY

    const fetchApiData = async () => {
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
          );
          setWeatherInfo(res.data);
          console.log(res.data); //weather data
        } catch (error) {
          console.log(error);
        }
      }
    
    const inputHandler = async(e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetchApiData(city);
  };  

  return (
    <div>
    <form onSubmit={submitHandler}>
    <input type="text" placeholder="Enter a city" value={city}  onChange={inputHandler}/>
        <button type="submit">Get Weather</button>
    </form>
      {weatherInfo ? (
        <>
          <h2>{weatherInfo.name}</h2>
          <p>{weatherInfo.main.temp}°C</p>
          <p>{weatherInfo.weather[0].description}</p>
          <p>feels like{weatherInfo.main.feels_like}°C</p>
          <p>Humidity {weatherInfo.main.humidity}%</p>
        </>) : (
        <p>Loading..</p>
      )}
    </div>
  );
};

export default WeatherApp;