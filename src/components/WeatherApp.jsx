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
    <>
      <div className="outline h-[460px] w-[900px]">
        <div className="flex justify-center items-center h-full grid grid-rows-4">
          {/* <label htmlFor="">Temp here: </label> */}
          <form onSubmit={submitHandler}>
            <div className="grid row-span-1 bg-green-300">
              <input type="text" placeholder="Enter location" value={city} onChange={inputHandler}></input>
              <button type="submit">Submit</button>
            </div>
          </form>
          <div className="grid row-span-3 bg-yellow-300 h-72 w-96">
            <div className="grid grid-cols-2">
            <div className="order-1">card</div>
            <div className="col-span-1 order-2 flex justify-end shrink w-48 bg-blue-400 text-center">
              {weatherInfo ? (
                <div>
                    <div className="bg-green-300 p-4 mt-5 mb-5">
                  <p className=" text-5xl"> {weatherInfo.main.temp}°C</p></div>
                  <p>Description: {weatherInfo.weather[0].description}</p>
                  <h2>{weatherInfo.name}</h2>
                  {/* <p>Feels like : {weatherData.main.feels_like}°C</p> */}
                  <p>Pressure : {weatherInfo.main.pressure}</p>
                  <div className="bg-pink-200 flex justify-normal space-x-4">
                    <p>{weatherInfo.main.humidity}% <br></br> Humidity </p>
                    <p>{weatherInfo.wind.speed}m/s <p>Wind Speed</p> </p>
                  </div>
                </div>
              ) : (
                <p>Loading..</p>
              )}
            </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;