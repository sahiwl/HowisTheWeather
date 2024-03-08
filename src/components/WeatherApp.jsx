import { useEffect, useState } from "react";
import axios from "axios";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState(null); 

const fetchApiData = async () => {

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=NEWDELHI&units=metric&appid=${apiKey}`
    )
    .then(response=>response.json())
    .then(data=>setWeatherInfo(data))
    console.log(weatherData); // weather data

};

    return(
        <div>
            <form>
        <input type="text" placeholder="Enter a city" />
        <button type="submit">Get Weather</button>
      </form>

        </div>
    )
}

export default WeatherApp;