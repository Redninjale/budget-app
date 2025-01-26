import React, { useState } from 'react';
import Gacha from './GachaShop/Gacha';
import Shop from './GachaShop/Shop';

const GachaShop = () => {
  const [activeTab, setActiveTab] = useState('Gacha'); // State for toggling tabs

  return (
    <div className="flex flex-col pt-20 bg-[url('./assets/greenstripe.gif')] bg-cover h-screen w-screen">
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
            activeTab === 'Shop' ? 'text-green-500  ' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('Shop')}
        >
          Shop
        </button>
      </div>

      {/* Content */}
      <div className="mt-2">
        {activeTab === 'Gacha' ? <Gacha /> : <Shop />}
      </div>
    </div>
  );
};

export default GachaShop;
