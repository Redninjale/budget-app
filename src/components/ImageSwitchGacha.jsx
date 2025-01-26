import React, { useState, useEffect } from 'react';
import gachaButton from '../assets/wishbutton.png';

const GifSwitcher = ({ initialGif, clickedGif, delay }) => {
  // State to track the current GIF
  const [gif, setGif] = useState(initialGif);

  const [showPopup, setShowPopup] = useState(false);

  // Function to change the GIF on click
  const changeGif = () => {
    setGif(clickedGif); // Change to the clicked GIF
    setShowPopup(false); // Reset popup visibility
    // Show the popup after 5 seconds
    setTimeout(() => {
      setShowPopup(true);
    }, 4500); // 5000ms = 5 seconds
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
    </button>
    {showPopup && (
        <div className="absolute top-1/3 left-1/10 bg-white border rounded-lg shadow-lg p-20">
          <p className="text-center text-gray-800">This is the popup!</p>
        </div>
      )}
    </div>
  );
};

export default GifSwitcher;