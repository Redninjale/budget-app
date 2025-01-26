import React, { useState, useEffect } from 'react';

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
    <img
      src={gif} // Use the current gif source
      className="cursor-pointer"
      alt="GIF"
      onClick={changeGif} // Change the GIF when clicked
    />
  );
};

export default GifSwitcher;
