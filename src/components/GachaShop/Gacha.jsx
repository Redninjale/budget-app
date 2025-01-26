import React from 'react';
import gachaMachine from '../../assets/catmachine.png';

const Gacha = () => {
  return (
    <main className="bg-[url('./assets/gachabackground.png')] bg-cover flex h-screen w-screen -m-5 -mt-35">

    <div className="flex items-center justify-center">
      <img src={gachaMachine} alt="gacha machine"/>
    </div>

      {/* <img src={gachaMachine} alt="gacha machine" className="w-1/2 h-1/2" /> */}
    </main>
  );
};

export default Gacha;
