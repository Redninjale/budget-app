import React, { useState } from 'react';
import ImageSwitch from './ImageSwitch';
import collectionData from '../assets/data/collection.json'; // Import collection data
import initialGif1 from '../assets/white-cat-idle.png';
import otherGif1 from '../assets/white-cat-idle.gif';
import initialGif2 from '../assets/cat-on-string.png';
import otherGif2 from '../assets/cat-on-string.gif';
import initialGif3 from '../assets/orange-cat.png';
import otherGif3 from '../assets/orange-cat.gif';

const Home = () => {
  const [showCollection, setShowCollection] = useState(false); // Toggle for popup

  return (
    <main className="bg-[url('./assets/homebackground.png')] bg-cover flex h-screen w-screen">
      {/* View Collection Button */}
      <button
        className="absolute top-5 left-5 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        onClick={() => setShowCollection(true)}
      >
        View Collection
      </button>

      {/* GIFs on Home Screen */}
      <div className="absolute top-80 left-0 w-40 h-40 transform scale-80">
        <ImageSwitch initialGif={initialGif1} clickedGif={otherGif1} delay={1300} />
      </div>
      <div className="absolute bottom-30 right-17 w-40 h-40 transform scale-130">
        <ImageSwitch initialGif={initialGif2} clickedGif={otherGif2} delay={1750} />
      </div>
      <div className="absolute top-75 right-0 w-40 h-40 transform scale-110">
        <ImageSwitch initialGif={initialGif3} clickedGif={otherGif3} delay={1000} />
      </div>

      {/* Collection Popup */}
      {showCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white w-4/5 h-4/5 p-6 rounded-lg shadow-lg overflow-y-auto relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800"
              onClick={() => setShowCollection(false)}
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-center mb-6">My Collection</h2>

            {/* Cats Section */}
            <h3 className="text-xl font-semibold mb-4">Cats</h3>
            <div className="grid grid-cols-3 gap-4 mb-8">
              {collectionData.cats.map((cat, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center p-4 rounded-lg shadow-md ${
                    cat.acquired ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className={`w-24 h-24 mb-2 ${
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
                    className={`w-24 h-24 mb-2 ${
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
