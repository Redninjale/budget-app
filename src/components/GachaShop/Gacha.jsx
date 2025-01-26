import React from 'react';
import ImageSwitch from '../ImageSwitch';
import gachaMachine from '../../assets/gachapon1.png';
import gachaMachine1 from '../../assets/gachapon.gif';

const Gacha = () => {

  return (
    <main className="">

    <div className="flex items-center justify-center">
      <ImageSwitch initialGif={gachaMachine} clickedGif={gachaMachine1} delay={4600}></ImageSwitch>
    </div>

      {/* <img src={gachaMachine} alt="gacha machine" className="w-1/2 h-1/2" /> */}
    </main>
  );
};

export default Gacha;
