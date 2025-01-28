<<<<<<< Updated upstream
import React, { useState } from 'react';
import ImageSwitchGacha from '../ImageSwitchGacha';
import gachaMachine from '../../assets/gachapon1.png';
import gachaMachine1 from '../../assets/gachapon.gif';
import collectionData from '../../assets/data/collection.json'; // Import collection.json
=======
import React from 'react';
import ImageSwitchGacha from '../ImageSwitchGacha';
import gachaMachine from '../../assets/gachapon1.png';
import gachaMachine1 from '../../assets/gachapon.gif';
import coin from '../../assets/currencyIcon.png';
>>>>>>> Stashed changes

const Gacha = () => {
  const [popupMessage, setPopupMessage] = useState('');

  const handleGachaDraw = () => {
    const randomIndex = Math.floor(Math.random() * collectionData.cats.length);
    const drawnCat = collectionData.cats[randomIndex];

    if (!drawnCat.acquired) {
      drawnCat.acquired = true; // Update acquired status
      setPopupMessage(`You got ${drawnCat.name}!`);
    } else {
      setPopupMessage(`You already have ${drawnCat.name}.`);
    }

    // Save the updated collection data
    // For front-end, you need to store it in localStorage or send it to a back-end API
    localStorage.setItem('collection', JSON.stringify(collectionData));

    setTimeout(() => setPopupMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="m-5">
        <ImageSwitchGacha
          initialGif={gachaMachine}
          clickedGif={gachaMachine1}
          delay={4600}
          onClick={handleGachaDraw}
        />
      </div>

<<<<<<< Updated upstream
      {popupMessage && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-solid max-w-sm text-center">
            <h2 className="text-xl font-bold text-green-500 mb-2">Gacha Result</h2>
            <p className="text-lg text-gray-800">{popupMessage}</p>
          </div>
        </div>
      )}
=======
    <div className="flex items-center justify-center m-5 ">
    {/* </div> */}
    {/* <button className="!bg-transparent !p-0 !border-none"> */}
      {/* <img src={gachaButton} alt="gacha button"  className="flex items-center justify-center bg-transparent" /> */}
      <ImageSwitchGacha initialGif={gachaMachine} clickedGif={gachaMachine1} delay={4600}></ImageSwitchGacha>
    {/* </button> */}
    </div>
    {/* <div className="relative w-full h-20">
      <img src={coin} alt="coin" className="absolute bottom-7 left-0 m-2 w-15 h-15" />
      <p className='flex text-[50px] absolute bottom-8 left-17 text-white [text-shadow:2px_2px_0px_black] special-text'>100</p> 
    </div> */}

      {/* <img src={gachaMachine} alt="gacha machine" className="w-1/2 h-1/2" /> */}
>>>>>>> Stashed changes
    </main>
  );
};

export default Gacha;
