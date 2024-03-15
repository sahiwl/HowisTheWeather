import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  // console.log(currentTime);
  const fetchApiData = async () => {
    const customId = 123;
    const unwantedErr = 321;
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherInfo(res.data);
      console.log(res.data); //weather data
    } catch (error) {
      if (error.response.status === 404) {
        //catches 404 error
        console.clear(); //clears console if 404 status code error occurs
        toast.error("Please enter a correct city/town. Hint: There is a typo🤓" ,{
          theme: "dark", toastId: customId
        });
      }
      else{
        toast.error(error.response.status +": Unwanted error, we're working on a fix." ,{
          theme: "dark", toastId: unwantedErr
        });
      }
      // console.log(error);
    }
  };

  const inputHandler = async (e) => {
    setCity(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   await fetchApiData(city);
  };

  const lightRain = new Set([300, 301, 310, 500, 520]);
  const heavyRain = new Set([
    302, 312, 313, 314, 321, 501, 502, 503, 504, 511, 521, 531,
  ]);
  const lightSnow = new Set([600, 601, 611, 612, 613, 615, 620]);
  const heavySnow = new Set([602, 616, 621, 622]);
  const clearSky = new Set([800, 701, 711, 721]);
  const clouds = new Set([
    771, 762, 761, 751, 741, 731, 781, 801, 802, 803, 804,
  ]);
  const thunderstorm = new Set([
    200, 201, 202, 210, 211, 212, 221, 230, 231, 232,
  ]);

  return (
    <>
      <div className="rounded-lg backdrop-blur-3xl bg-white/5 h-[460px] w-[500px]">
        <div className="flex justify-center items-center font-quicksand h-full grid grid-rows-4">
          {/* <label htmlFor="">Temp here: </label> */}
          <form onSubmit={submitHandler}>
            <div className="grid row-span-1 bg--300 grid-cols-4">
              <input
                type="text"
                placeholder="Enter a city/town"
                value={city}
                onChange={inputHandler}
                className="placeholder:text-gray-300 text-white px-4 py-3 rounded-l-lg focus:outline-none bg-white/5 backdrop-3xl col-span-3"
              ></input>
              <button
                type="submit"
                className="placeholder:text-gray-300 text-white px-4 py-3 rounded-r-lg bg-white/5 backdrop-3xl"
              >
                Search
              </button>
            </div>
          </form>

          <div className="grid row-span-3 rounded-lg  h-72 w-[29rem] relative">
            {/* bg-yellow-300 w */}

            <div className="grid grid-cols-2">
              <br />
              {weatherInfo && (
                <div className="order-1 w-96 relative  ">
                  <div className="absolute -left-12 bottom-2 w-fit h-fit">
                    {/*bg-slate-400  w*/}
                    
                    {thunderstorm.has(weatherInfo.weather[0].id) && (
                      <img src="./thunder.svg" className="h-72" alt="" />
                    )}
                    {/* LIGHT RAIN */}
                    {lightRain.has(weatherInfo.weather[0].id) && (
                      <img src="./light-rain.svg" className="h-72" alt="" />
                    )}
                    {/* HEAVY RAIN */}
                    {heavyRain.has(weatherInfo.weather[0].id) && (
                      <img src="./heavy-rain.svg" className="h-72" alt="" />
                    )}
                    {/* CLEAR SKY */}
                    {clearSky.has(weatherInfo.weather[0].id) && (
                      <img src="./day.svg" className="h-72 " alt="" />
                    )}
                    {/* LIGHT SNOW */}
                    {lightSnow.has(weatherInfo.weather[0].id) && (
                      <img src="./light-snow.svg" className="h-72 " alt="" />
                    )}
                    {/* HEAVY SNOW */}
                    {heavySnow.has(weatherInfo.weather[0].id) && (
                      <img src="./heavy-snow.svg" className="h-72" alt="" />
                    )}
                    {/* CLOUDS */}
                    {clouds.has(weatherInfo.weather[0].id) && (
                      <img src="./cloudy.svg" className="h-72" alt="" />
                    )}
                  </div>
                </div>
                //Add a celcius parameter, if the temp is between 0 - 10C, it'll show frozen.svg despite of any code
              )}
              <div className="w-max ">
                {/* bg-blue-400 w */}
                {weatherInfo ? (
                  <div className="col-span-1 order-2 flex justify-end shrink text-center rounded-lg w-60 text-xl absolute right-1 bottom-1">
                    <div className="text-slate-300">
                      <div className=" p-4 mt-5 mb-1 ">
                        {/* bg-green-300 w */}
                        <p className="text-8xl">
                          {Math.round(weatherInfo.main.temp)}°C
                        </p>
                      </div>
                      <div className="-ml-5 mb-3 space-y-3">
                        {/* bg-slate-500 w */}
                        <p>{weatherInfo.weather[0].description}</p>
                        <h2>{weatherInfo.name}</h2>
                        {/* <p>Feels like : {weatherData.main.feels_like}°C</p> */}
                        {/* <p>Pressure : {weatherInfo.main.pressure}</p> */}
                        {/* <p>ID: {weatherInfo.weather[0].id}</p> */}
                      </div>
                     
                      <div className="flex flex-grow mt-4 justify-between px-2 space-x-8 text-xl">
                        <div className="flex items-center">
                          {/* Humidity Icon */}
                          <img
                            src="humidity-50.png"
                            alt="Humidity Icon"
                            className="h-6 w-6 mr-2"
                          />
                          <p className="text-md">
                            {weatherInfo.main.humidity + "%"}
                          </p>
                        </div>
                        <div className="flex items-center">
                          {/* Wind Speed Icon */}
                          <img
                            src="wind.svg"
                            alt="Wind Speed Icon"
                            className="h-6 w-6 mr-2"
                          />
                          <p className="text-md">
                            {weatherInfo.wind.speed} m/s
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2 px-4 text-base">
                        <p>Humidity</p>
                        <p>Wind Speed</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer pauseOnFocusLoss={false} limit={1} autoClose={3500}/>
    </>
  );
};

export default WeatherApp;
