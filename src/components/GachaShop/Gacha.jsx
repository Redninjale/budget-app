import React from 'react';
import bgImage from './assets/background.jpg';

const Gacha = () => {
  return (
    <div
      className="w-screen h-screen text-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover', // Ensures the image covers the container
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents tiling if the image is smaller
      }}
    >
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-white">Gacha Machine</h1>
        <p className="text-gray-200 mt-2">Roll for a chance to collect new cats!</p>
        <button className="mt-4 py-2 px-6 bg-yellow-400 text-white rounded-lg">Roll</button>
      </div>
    </div>
  );
};

export default Gacha;
