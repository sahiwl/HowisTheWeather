import { useEffect, useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // console.log(currentTime);
  const fetchApiData = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeatherInfo(res.data);
      console.log(res.data); //weather data
    } catch (error) {
      if (error.response && error.response.status === 404) {
        //catches 404 error
        console.clear(); //clears console if 404 status code error occurs
        alert("Please enter a correct cityname 🌍");
      }
      // console.log(error);
    }
  };
  // const Weathericon = (()=>{
  //   if(weatherInfo.weather[0].description == "broken clouds"){
  //     return <div className="">
  //       <img src="./rainy-4" className="h-48" alt="" />
  //       console.log("logging");
  //     </div>
  //   }
  // })

  const inputHandler = async (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    fetchApiData(city);
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
      <div className=" h-[460px] w-[600px]">
        <div className="flex justify-center items-center font-quicksand h-full grid grid-rows-4">
          {/* <label htmlFor="">Temp here: </label> */}
          <form onSubmit={submitHandler}>
            <div className="grid row-span-1 bg--300">
              
              <input
                type="text"
                placeholder="Enter location"
                value={city}
                onChange={inputHandler}
                className="placeholder:text-gray-300 text-white text-black px-4 py-3 rounded-lg bg-white/5 backdrop-3xl"
              ></input>
              <button type="submit" className="outline">
                Submit
              </button>
            </div>
          </form>

          <div className="grid row-span-3 bg-yellow-300 rounded-lg h-72 w-[29rem]">
              <div className="grid grid-cols-2">
                {weatherInfo && (
                  <div className="order-1 w-96 relative  ">
                    <div className="absolute -left-12 bottom-2 w-fit h-fit bg-slate-400  ">
                    card
                    {/* <img src="./rainy-6" className="h-48"/> */}
                    {/* {(weatherInfo.weather[0].description.toLowerCase().includes("haze")) &&
              (<img src="./rainy-6.svg" className="h-48"  alt="" />)} */}
                    {/* THUNDERSTORM */}
                    {thunderstorm.has(weatherInfo.weather[0].id) && (
                      <img src="./thunder.svg" className="h-48" alt="" />
                    )}
                  {/* LIGHT RAIN */}
                  {lightRain.has(weatherInfo.weather[0].id) && (
                    <img src="./light-rain.svg" className="h-48" alt="" />
                  )}
                  {/* HEAVY RAIN */}
                  {heavyRain.has(weatherInfo.weather[0].id) && (
                    <img src="./heavy-rain.svg" className="h-48" alt="" />
                  )}
                  {/* CLEAR SKY */}
                  {clearSky.has(weatherInfo.weather[0].id) && (
                    <img src="./day.svg" className="h-72 " alt="" />
                  )}
                  {/* LIGHT SNOW */}
                  {lightSnow.has(weatherInfo.weather[0].id) && (
                    <img src="./light-snow.svg" className="h-48 " alt="" />
                  )}
                  {/* HEAVY SNOW */}
                  {heavySnow.has(weatherInfo.weather[0].id) && (
                    <img src="./heavy-snow.svg" className="h-48" alt="" />
                  )}
                  {/* CLOUDS */}
                  {clouds.has(weatherInfo.weather[0].id) && (
                    <img src="./cloudy.svg" className="h-48" alt="" />
                  )}
                  </div>
                </div>
                //Add a celcius parameter, if the temp is between 0 - 10C, it'll show frozen.svg despite of any code
              )}
              <div className="col-span-1 order-2 flex justify-end shrink bg-blue-400 text-center rounded-lg">
                {weatherInfo ? (
                  <div>
                    <div className="bg-green-300 p-4 mt-5 mb-2 flex flex-grow">
                      <p className="text-5xl"> {weatherInfo.main.temp}°C</p>
                    </div>
                    <div className="bg-slate-500 -ml-5 mb-3">
                      <p>Description: {weatherInfo.weather[0].description}</p>
                      <h2>{weatherInfo.name}</h2>
                      {/* <p>Feels like : {weatherData.main.feels_like}°C</p> */}
                      <p>Pressure : {weatherInfo.main.pressure}</p>
                      <p>ID: {weatherInfo.weather[0].id}</p>
                    </div>
                    {/* <div className="bg-pink-200 flex justify-normal space-x-8 flex-row  h-fit -mt-2">
                      <div className="">
                        <img src="./humidity-50.png" className="h-7" />
                        {weatherInfo.main.humidity + "%"}
                        <p>humidity</p>
                      </div>
                      <div className="">
                        <img src="./wind.svg" className="h-8" alt="" />
                        {weatherInfo.wind.speed}m/s
                        <p> Wind Speed </p>
                      </div>
                    </div> */}
                    <div className="flex flex-grow mt-4 justify-between px-2 space-x-8">
                      <div className="flex items-center">
                        {/* Humidity Icon */}
                        <img
                          src="humidity-50.png"
                          alt="Humidity Icon"
                          className="h-6 w-6 mr-2"
                        />
                        <p className="text-md">{weatherInfo.main.humidity + "%"}</p>
                      </div>
                      <div className="flex items-center">
                        {/* Wind Speed Icon */}
                        <img
                          src="wind.svg"
                          alt="Wind Speed Icon"
                          className="h-6 w-6 mr-2"
                        />
                        <p className="text-md">{weatherInfo.wind.speed} m/s</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 px-4 text-base">
                      <p>Humidity</p>
                      <p>Wind Speed</p>
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
