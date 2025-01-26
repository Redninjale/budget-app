import React, { useState, useEffect } from 'react';
import gachaButton from '../assets/wishbutton.png';

const GifSwitcher = ({ initialGif, clickedGif, delay }) => {
  // State to track the current GIF
  const [gif, setGif] = useState(initialGif);

  // Function to change the GIF on click
  const changeGif = () => {
    setGif(clickedGif); // Change to the clicked GIF
  };

  // Revert the GIF back after 3 seconds
  useEffect(() => {
    if (gif === clickedGif) {
      const timer = setTimeout(() => {
        setGif(initialGif); // Revert back to the initial GIF
      }, delay); // 3 seconds delay

      // Cleanup the timer when the component is unmounted or when gif changes
      return () => clearTimeout(timer);
    }
  }, [gif, initialGif, clickedGif]); // Effect will run when gif state changes

  return (
    <div>
    <img
      src={gif} // Use the current gif source
      className="cursor-pointer"
      alt="GIF"
    />
    <button className="!bg-transparent !border-none flex items-center justify-center " onClick={changeGif}>
      <img src={gachaButton} alt="gacha button" className="flex items-center justify-center bg-transparent w-3/4" />

    </button></div>
  );
};

export default GifSwitcher;