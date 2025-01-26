import React, { useState, useEffect } from 'react';
import ImageSwitch from './imageSwitch';

import initialGif1 from "../assets/white-cat-idle.png"; // Default GIF
import otherGif1 from "../assets/white-cat-idle.gif"; // The GIF to switch to


const Home = () => {
  // State to track the current GIF
  return (
    <main className="bg-[url('./assets/homebackground.png')] bg-cover flex h-screen w-screen">
      <div className='absolute top-80 right-1 w-40 h-40 transform scale-80'>
        <ImageSwitch initialGif={initialGif1} clickedGif={otherGif1}></ImageSwitch>
      </div>
    </main>
  );
};

export default Home;

 