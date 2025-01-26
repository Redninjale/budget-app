import React, { useState } from 'react';
import ImageSwitch from './imageSwitch';

import initialGif1 from "../assets/white-cat-idle.png"; 
import otherGif1 from "../assets/white-cat-idle.gif"; 
import initialGif2 from "../assets/cat-on-string.png"; 
import otherGif2 from "../assets/cat-on-string.gif"; 
import initialGif3 from "../assets/orange-cat.png"; 
import otherGif3 from "../assets/orange-cat.gif"; 

import catData from '../assets/data/catbook.json'; // JSON file
import bg from '../assets/homebackground.png';


const Home = () => {
  const [selectedCat, setSelectedCat] = useState(null);

  const handleCatClick = (catName) => {
    if (!Array.isArray(catData.cats)) {
      console.error('Invalid cat data:', catData.cats);
      return;
    }
    const catInfo = catData.cats.find(cat => cat.name === catName);
    if (!catInfo) {
      console.warn(`Cat not found with name: ${catName}`);
    } else {
      console.log('Cat info:', catInfo);
    }
    setSelectedCat(catInfo || null);
  };

  return (
    <main className="bg-[url('./assets/homebackground.png')] bg-cover flex h-screen w-screen">
      <div className='absolute top-80 left-0 w-40 h-40 transform scale-80'>
        <ImageSwitch initialGif={initialGif1} clickedGif={otherGif1} delay={1300}></ImageSwitch>
      </div>

      <div
        className="absolute bottom-30 right-17 w-40 h-40 transform scale-130"
        onClick={() => handleCatClick('Summer')}
      >
        <ImageSwitch initialGif={initialGif2} clickedGif={otherGif2} delay={1750} />
      </div>

      <div
        className="absolute top-75 right-0 w-40 h-40 transform scale-110"
        onClick={() => handleCatClick('Bethany')}
      >
        <ImageSwitch initialGif={initialGif3} clickedGif={otherGif3} delay={1000} />
      </div>

      {/* {selectedCat && (
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
      )} */}
    </main>
  );
};

export default Home;
