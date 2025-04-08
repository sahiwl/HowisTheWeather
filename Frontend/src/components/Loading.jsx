import React from 'react';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-teal-400 border-dashed rounded-full animate-spin"></div>
      <div className="absolute bottom-24 text-teal-400 md:flex flex-wrap  text-center"> it will take some time to start the backend server due to cold boot (~50secs)</div>
    </div>
  );
};

export default Loading;
