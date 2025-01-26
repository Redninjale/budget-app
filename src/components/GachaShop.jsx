import React, { useState } from 'react';
import Gacha from './GachaShop/Gacha';
import Shop from './GachaShop/Shop';

const GachaShop = () => {
  const [view, setView] = useState('gacha');

  return (
    <div className="p-4 pt-16 bg-[url('./assets/gachabackground.png')] bg-cover flex h-screen w-screen">
      <div className="flex justify-center space-x-4 absolute ms-15 top-30">
        <button
          onClick={() => setView('gacha')}
          className={`py-2 px-4 rounded-lg ${view === 'gacha' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Gacha
        </button>
        <button
          onClick={() => setView('shop')}
          className={`py-2 px-4 rounded-lg ${view === 'shop' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Shop
        </button>
      </div>
      <div className="mt-6">
        {view === 'gacha' ? <Gacha /> : <Shop />}
      </div>
    </div>
  );
};

export default GachaShop;
