import React, { useState } from 'react';
import ImageSwitch from './ImageSwitch';
<<<<<<< Updated upstream
import collectionData from '../assets/data/collection.json'; // Import collection data
import initialGif1 from '../assets/white-cat-idle.png';
import otherGif1 from '../assets/white-cat-idle.gif';
import initialGif2 from '../assets/cat-on-string.png';
import otherGif2 from '../assets/cat-on-string.gif';
import initialGif3 from '../assets/orange-cat.png';
import otherGif3 from '../assets/orange-cat.gif';
=======

import initialGif1 from "../assets/white-cat-idle.png"; 
import otherGif1 from "../assets/white-cat-idle.gif"; 
import initialGif2 from "../assets/cat-on-string.png"; 
import otherGif2 from "../assets/cat-on-string.gif"; 
import initialGif3 from "../assets/orange-cat.png"; 
import otherGif3 from "../assets/orange-cat.gif"; 

import catData from '../assets/data/catbook.json'; // JSON file
import bg from '../assets/homebackground.png';

>>>>>>> Stashed changes

const Home = () => {
  const [showCollection, setShowCollection] = useState(false); // Toggle for collection popup
  const [selectedCat, setSelectedCat] = useState(null); // State for selected cat popup

  const handleCatClick = (catName) => {
    const selected = collectionData.cats.find((cat) => cat.name === catName);
    setSelectedCat(selected || null); // Set the selected cat data
  };

  return (
    <main className="special-text bg-[url('./assets/homebackground.png')] bg-cover flex h-screen w-screen">
      {/* View Collection Button */}
      <button
        className="absolute special-text top-40 p-2 left-1/2 transform -translate-x-1/2 bg-pastel-green border-solid border-4 border-black text-brown-800 font-bold text-xl rounded-2xl shadow-md hover:bg-green-500 transition transform hover:scale-105"
        onClick={() => setShowCollection(true)}
      >
        View Collection
      </button>

      {/* GIFs on Home Screen */}
      <div
        className="absolute top-80 left-0 w-40 h-40 transform scale-80 cursor-pointer"
        onClick={() => handleCatClick('Snowball')}
      >
        <ImageSwitch initialGif={initialGif1} clickedGif={otherGif1} delay={1300} />
      </div>
      <div
        className="absolute bottom-30 right-17 w-40 h-40 transform scale-130 cursor-pointer"
        onClick={() => handleCatClick('Summer')}
      >
        <ImageSwitch initialGif={initialGif2} clickedGif={otherGif2} delay={1750} />
      </div>
      <div
        className="absolute top-75 right-0 w-40 h-40 transform scale-110 cursor-pointer"
        onClick={() => handleCatClick('Bethany')}
      >
        <ImageSwitch initialGif={initialGif3} clickedGif={otherGif3} delay={1000} />
      </div>

      {/* Selected Cat Popup */}
      {selectedCat && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md relative">
            <button
              className="absolute top-2 right-2 bg-gray-700 text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-800"
              onClick={() => setSelectedCat(null)}
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-center mb-4">{selectedCat.name}</h2>
            <p className="text-center mb-2">{selectedCat.description}</p>
            <img src={selectedCat.icon} alt={selectedCat.name} className="w-30 h-20 mx-auto" />
          </div>
        </div>
      )}

      {/* Collection Popup */}
      {showCollection && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-white w-4/5 h-4/5 p-6 rounded-lg shadow-lg overflow-y-auto relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 bg-gray-700 text-black rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800"
              onClick={() => setShowCollection(false)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-center mb-6">My Collection</h2>

            {/* Cats Section */}
            <h3 className="text-xl font-semibold mb-4">Cats</h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {collectionData.cats.map((cat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-7 rounded-lg shadow-md ${
                    cat.acquired ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className={`w-12 h-12 mb-2 ${
                      !cat.acquired ? 'opacity-50' : ''
                    }`}
                  />
                  <p className="font-bold text-lg">{cat.name}</p>
                  {!cat.acquired && (
                    <p className="text-red-500 text-sm mt-1">Not Acquired</p>
                  )}
                </div>
              ))}
            </div>

            {/* Accessories Section */}
            <h3 className="text-xl font-semibold mb-4">Accessories</h3>
            <div className="grid grid-cols-3 gap-4">
              {collectionData.accessories.map((accessory, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 rounded-lg shadow-md ${
                    accessory.acquired ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <img
                    src={accessory.icon}
                    alt={accessory.name}
                    className={`w-24 h-12 mb-2 ${
                      !accessory.acquired ? 'opacity-50' : ''
                    }`}
                  />
                  <p className="font-bold text-lg">{accessory.name}</p>
                  {!accessory.acquired && (
                    <p className="text-red-500 text-sm mt-1">Not Acquired</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
