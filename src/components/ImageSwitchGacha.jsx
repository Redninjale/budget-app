import React, { useState, useEffect, useContext } from 'react';
import gachaButton from '../assets/wishbutton.png';
import catsData from '../assets/data/catbook.json';
import { TicketsContext } from '../App';

const GifSwitcher = ({ initialGif, clickedGif, delay }) => {
  const [gif, setGif] = useState(initialGif); // State to track the current GIF
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [randomCat, setRandomCat] = useState(null); // State to store the random cat data
  const { tickets, setTickets } = useContext(TicketsContext);

  // Function to change the GIF on click
  const changeGif = () => {
    setGif(clickedGif); // Change to the clicked GIF
    setShowPopup(false); // Reset popup visibility

    // Randomly select a cat from the JSON data
    const randomIndex = Math.floor(Math.random() * catsData.cats.length);
    setRandomCat(catsData.cats[randomIndex]);

    localStorage.setItem("tickets", tickets - 1);
    setTickets(tickets - 1);
    // Show the popup after 4.5 seconds
    setTimeout(() => {
      setShowPopup(true);
    }, 4500); // 4.5 seconds delay
  };

  // Revert the GIF back after the specified delay
  useEffect(() => {
    if (gif === clickedGif) {
      const timer = setTimeout(() => {
        setGif(initialGif); // Revert back to the initial GIF
      }, delay);

      // Cleanup the timer when the component is unmounted or when gif changes
      return () => clearTimeout(timer);
    }
  }, [gif, initialGif, clickedGif, delay]);

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={gif} // Use the current GIF source
        className="cursor-pointer"
        alt="GIF"
      />
      <button
        className="!bg-transparent !border-none flex items-center justify-center"
        onClick={changeGif}
      >
        <img
          src={gachaButton}
          alt="gacha button"
          className="flex items-center justify-center bg-transparent w-3/4"
        />
      </button>

      {/* Popup displaying the random cat */}
      {showPopup && randomCat && (
        <div className="absolute top-1/2 special-text left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-opacity-30 backdrop-blur-sm bg-white border-4 border-solid rounded-lg shadow-lg p-6 w-5/6 max-w-lg">
          <button
            className="absolute top-2 right-2 bg-red-500 text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
            onClick={() => setShowPopup(false)} // Close the popup
          >
            &times;
          </button>
          <img
            src={randomCat.icon}
            alt={randomCat.name}
            className="w-30 h-25 mx-auto"
          />
          <h2 className="text-xl text-gray-600 font-bold text-center mt-4">{randomCat.name}</h2>
          <p className="text-gray-600 text-center mt-2">{randomCat.description}</p>
        </div>
      )}
    </div>
  );
};

export default GifSwitcher;
