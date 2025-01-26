import React, { useState, useEffect } from 'react';
import ImageSwitch from './imageSwitch';

import initialGif1 from "../assets/white-cat-idle.png"; // Default GIF
import otherGif1 from "../assets/white-cat-idle.gif"; // The GIF to switch to

import initialGif2 from "../assets/cat-on-string.png"; // Default GIF
import otherGif2 from "../assets/cat-on-string.gif"; // The GIF to switch to

import initialGif3 from "../assets/orange-cat.png"; // Default GIF
import otherGif3 from "../assets/orange-cat.gif"; // The GIF to switch to


const Home = () => {
  // State to track the current GIF
  return (
    <main className="bg-[url('./assets/homebackground.png')] bg-cover flex h-screen w-screen">
      <div className='absolute top-80 left-0 w-40 h-40 transform scale-80'>
        <ImageSwitch initialGif={initialGif1} clickedGif={otherGif1} delay={1300}></ImageSwitch>
      </div>

      <div className='absolute bottom-30 right-17 w-40 h-40 transform scale-130'>
        <ImageSwitch initialGif={initialGif2} clickedGif={otherGif2} delay={1750}></ImageSwitch>
      </div>

      <div className='absolute top-75 right-0 w-40 h-40 transform scale-110'>
        <ImageSwitch initialGif={initialGif3} clickedGif={otherGif3} delay={1000}></ImageSwitch>
      </div>
    </main>
  );
};

export default Home;

 