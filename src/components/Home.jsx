import React, { useState, useEffect } from 'react';
import ImageSwitch from './imageSwitch';
import coolthing from "../assets/white-cat-idle.gif"; // Default GIF
import otherGif from "../assets/cat-on-string.gif"; // The GIF to switch to

const Home = () => {
  // State to track the current GIF
  return (
    <main className="bg-[url('./assets/homebackground.png')] bg-cover flex h-screen w-screen">
      <ImageSwitch initialGif={coolthing} clickedGif={otherGif}></ImageSwitch>
    </main>
  );
};

export default Home;

 