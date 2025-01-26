import React, { useState } from 'react';
import Gacha from './GachaShop/Gacha';
import Shop from './GachaShop/Shop';

const GachaShop = () => {
  const [view, setView] = useState('gacha');

  return (
    <div className="flex flex-col pt-29 bg-[url('./assets/gachabackground.png')] bg-cover flex h-screen w-screen">
      <div className="flex flex-row justify-center space-x-4">
        <button
          onClick={() => setView('gacha')}
          className={`bg-[url('./assets/shopbutton.png')] w-18 h-19 rounded-lg ${view === 'gacha' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
        </button>
        <button
          onClick={() => setView('shop')}
          className={`bg-[url('./assets/shopbutton2.png')] w-18 h-19 rounded-lg ${view === 'shop' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
        </button>
      </div>
      <div className="mt-2">
        {view === 'gacha' ? <Gacha /> : <Shop />}
      </div>
    </div>
  );
};

export default GachaShop;
