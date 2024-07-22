import '@fontsource/bungee-shade';

const Landing = () => {
  const currentTime = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short"
  })
  
  return (
    <>
      <div className="text-4xl h-[20rem] mx-auto text-slate-300 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg text-center w-2/3 space-y-10 ">
          <p className="text-6xl pt-10">{currentTime.format(Date.now())}</p>
          <div className="font-BungeeShade text-3xl text-white-500">
            <a href="https://github.com/sahiwl/weatherapp" target="_blank">The Weather App</a>
          </div>
          <p className="text-lg">Check Weather by searching your city in search box </p>
        </div>
      </div>
    </>
  );
};

export default Landing;