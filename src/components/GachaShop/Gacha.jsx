import React from 'react';
import gachaMachine from '../../assets/catmachine.png';
import gachaButton from '../../assets/wishbutton.png';
import coin from '../../assets/coin.png';



const Gacha = () => {

  return (
<main className="bg-[url('./assets/gachabackground.png')] bg-cover flex flex-col h-screen w-screen -m-5 -mt-35">
  <div className="flex flex-col items-center justify-center flex-grow mt-30 m-5 mr-10">
    <img src={gachaMachine} alt="gacha machine" className="flex flex-col m-1" />
    <button className="!bg-transparent !p-0 !border-none">
      <img src={gachaButton} alt="gacha button" className="flex items-center justify-center bg-transparent" />
    </button>
  </div>
  <div className="relative w-full h-20">
    <img src={coin} alt="coin" className="absolute bottom-0 left-0 m-2" />
    <p className='itim-regular flex text-[40px] absolute bottom-2.5 left-20 text-white [text-shadow:2px_2px_0px_black] font-custom text-3xl'>100</p> 
  </div>
</main>
  );
};

export default Gacha;
