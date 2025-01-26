import React, { useState } from 'react';
import Gacha from './GachaShop/Gacha';
import Shop from './GachaShop/Shop';
import greenBackground from '../assets/greenstripe.gif';


const GachaShop = () => {
  const [activeTab, setActiveTab] = useState('Gacha'); // State for toggling tabs

  return (
    <div
    className="p-4 pt-25 min-h-screen bg-cover bg-center w-screen"
    style={{ backgroundImage: `url(${greenBackground})` }}
  >
      {/* Tabs */}
      <div className="flex text-xl justify-center special-text space-x-4 pt-10">
        <button
          className={`px-4 font-bold border-solid border-2 rounded-md shadow-md transition ${
            activeTab === 'Gacha' ? 'text-green-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('Gacha')}
        >
          Gacha
        </button>
        <button
          className={`px-4 py-2 font-bold border-solid border-2 rounded-md shadow-md transition ${
            activeTab === 'Shop' ? 'text-green-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('Shop')}
        >
          Shop
        </button>
      </div>

      {/* Content */}
      <div className="mt-2 flex-grow">
        {activeTab === 'Gacha' ? <Gacha /> : <Shop />}
      </div>
    </div>
  );
};

export default GachaShop;
