import React, { useState } from 'react';
import Gacha from './GachaShop/Gacha';
import Shop from './GachaShop/Shop';

const GachaShop = () => {
  const [view, setView] = useState('gacha');

  return (
    <div className="flex flex-col pt-29 bg-[url('./assets/greenstripe.gif')] bg-cover flex h-screen w-screen">
      <div className="flex flex-row justify-center space-x-4">
        <img
        src={shopbutton}
          onClick={() => setView('gacha')}
          className={`w-18 h-19 rounded-lg`}
        >
        </img>
        <img
        src={shopbutton2}
          onClick={() => setView('shop')}
          className={`w-18 h-19 rounded-lg`}
        >
        </img>
      </div>
      <div className="mt-2">
        {view === 'gacha' ? <Gacha /> : <Shop />}
      </div>
    </div>
  );
};

export default GachaShop;
