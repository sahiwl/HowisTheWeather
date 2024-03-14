const Loading = () => {
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  const me = " </sahil>";

  return (
    <>
      <div className="text-4xl w-[29rem] h-[18rem] mx-auto text-slate-300 ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  p-4 rounded-lg text-center w-2/3 space-y-10">
            <p className="text-5xl">{currentTime}</p>
        <p className="text-lg">Check Weather by searching your city in search box </p>

        <div className="font-mono text-xl">made by
              <a href="https://github.com/sahiwl"
                className="text-indigo-400 font-semibold">
                {me}
                 🐱‍👤
                </a>
                </div> 
        </div>
      </div>
    </>
  );
};

export default Loading;
