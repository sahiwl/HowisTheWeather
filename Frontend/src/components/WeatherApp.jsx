import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Landing from "./Landing";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WeatherApp = () => {
  const { city: paramCity } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState(paramCity || "");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const be = import.meta.env.VITE_BE_URL;
  // console.log(be)
  
  const fetchWeather = async (cityName) => {
    const id = "weather-error";
    try {
      console.log("Calling API with city:", cityName);
      const res = await axios.get(`${be}/weather/${encodeURIComponent(cityName)}`);

      setWeatherInfo(res.data);
    } catch (err) {
      const status = err.response?.status;
      const msg =
        status === 404
          ? "Please enter a correct city/town. (Hint: There is a typo 🏌️)"
          : `${status || 500}: Unexpected error, we're working on it.`;
      toast.error(msg, { theme: "dark", toastId: id });
    }
  };

  const handleInput = (e) => setCity(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    navigate(`/weather/${encodeURIComponent(city.trim())}`);
    await fetchWeather(city.trim());
  };

  useEffect(() => {
    if (paramCity) {
      setCity(paramCity);
      fetchWeather(paramCity);
    }
  }, [paramCity]);


  const lightRain = new Set([300, 301, 310, 500, 520]);
  const heavyRain = new Set([302, 312, 313, 314, 321, 501, 502, 503, 504, 511, 521, 531]);
  const lightSnow = new Set([600, 601, 611, 612, 613, 615, 620]);
  const heavySnow = new Set([602, 616, 621, 622]);
  const clearSky = new Set([800, 701, 711, 721]);
  const clouds = new Set([771, 762, 761, 751, 741, 731, 781, 801, 802, 803, 804]);
  const thunderstorm = new Set([200, 201, 202, 210, 211, 212, 221, 230, 231, 232]);

  return (
    <>
      <div className="bg-gradient-to-r from-teal-950 via-slate-700 to-slate-950 h-screen w-screen flex justify-center items-center font-Quicksand">
        <div className="rounded-lg backdrop-blur-3xl bg-white/5 h-auto w-full max-w-md mx-auto p-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-4 w-full mb-4">
            <input
              type="text"
              value={city}
              onChange={handleInput}
              placeholder="Enter a city/town"
              className="col-span-3 px-4 py-3 rounded-l-lg bg-white/5 text-white placeholder:text-gray-300 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-3 bg-white/5 text-white rounded-r-lg"
            >
              Search
            </button>
          </form>
          {/* {console.log("weatherInfo", weatherInfo)}
{console.log("weatherInfo?.weather?.[0]?.id", weatherInfo?.weather?.[0]?.id)} */}


          {weatherInfo?.weather?.[0]?.id ? (
            <div className="text-slate-300 text-center">
              <div className="relative flex justify-center ">
              {thunderstorm.has(weatherInfo.weather[0].id) && (
  <img src="/thunder.svg" className="h-36 md:h-72" alt="" />
)}
                  {lightRain.has(weatherInfo.weather[0].id) && (
                    <img
                      src="/light-rain.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {heavyRain.has(weatherInfo.weather[0].id) && (
                    <img
                      src="/heavy-rain.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {clearSky.has(weatherInfo.weather[0].id) && (
                    <img src="/day.svg" className="h-36 md:h-60" alt="" />
                  )}
                  {lightSnow.has(weatherInfo.weather[0].id) && (
                    <img
                      src="/light-snow.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {heavySnow.has(weatherInfo.weather[0].id) && (
                    <img
                      src="/heavy-snow.svg"
                      className="h-36 md:h-60"
                      alt=""
                    />
                  )}
                  {clouds.has(weatherInfo.weather[0].id) && (
                    <img src="/cloudy.svg" className="h-36 md:h-60" alt="" />
                  )}
              </div>

              <p className="text-4xl md:text-6xl">{Math.round(weatherInfo.main.temp)}°C</p>
              <h2 className="text-2xl">{weatherInfo.name}</h2>

              <div className="flex justify-between mt-4 text-sm">
                <div className="space-y-1 text-left">
                  <p>Feels like: {weatherInfo.main.feels_like}°C</p>
                  <p>Pressure: {weatherInfo.main.pressure} hPa</p>
                  <p>Min Temp: {weatherInfo.main.temp_min}°C</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="capitalize">{weatherInfo.weather[0].description}</p>
                  <p>Cloud Cover: {weatherInfo.clouds.all}%</p>
                  <p>Max Temp: {weatherInfo.main.temp_max}°C</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <div className="flex items-center space-x-2">
                  <img src="/humidity-50.png" className="h-6 w-6" alt="humidity" />
                  <p>{weatherInfo.main.humidity}%</p>
                </div>
                <div className="flex items-center space-x-2">
                  <img src="/wind.svg" className="h-6 w-6" alt="wind speed" />
                  <p>{(weatherInfo.wind.speed * 3.6).toFixed(2)} km/hr</p>
                </div>
              </div>
            </div>
          ) : (
            <Landing />
          )}
        </div>
      </div>


      <div className="font-mono text-xl absolute bottom-0 bg-white/5 w-full flex justify-center">
        <span>made by </span>
        <a
          href="https://github.com/sahiwl"
          target="_blank"
          className="text-indigo-400 font-semibold ml-1"
        >
          &copy;Sahil
        </a>
      </div>

      <ToastContainer pauseOnFocusLoss={false} limit={1} autoClose={3500} />
    </>
  );
};

export default WeatherApp;