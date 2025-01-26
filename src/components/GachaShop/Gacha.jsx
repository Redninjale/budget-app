import React from 'react';
import ImageSwitchGacha from '../ImageSwitchGacha';
import gachaMachine from '../../assets/gachapon1.png';
import gachaMachine1 from '../../assets/gachapon.gif';
import coin from '../../assets/currencyIcon.png';

const Gacha = () => {

  return (
    <main className="">

    <div className="flex items-center justify-center m-5 ">
    {/* </div> */}
    {/* <button className="!bg-transparent !p-0 !border-none"> */}
      {/* <img src={gachaButton} alt="gacha button"  className="flex items-center justify-center bg-transparent" /> */}
      <ImageSwitchGacha initialGif={gachaMachine} clickedGif={gachaMachine1} delay={4600}></ImageSwitchGacha>
    {/* </button> */}
    </div>
    <div className="relative w-full h-20">
      <img src={coin} alt="coin" className="absolute bottom-7 left-0 m-2 w-15 h-15" />
      <p className='flex text-[50px] absolute bottom-8 left-17 text-white [text-shadow:2px_2px_0px_black] special-text'>100</p> 
    </div>

      {/* <img src={gachaMachine} alt="gacha machine" className="w-1/2 h-1/2" /> */}
    </main>
  );
};

export default Gacha;
