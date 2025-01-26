import React, { useState } from 'react';
import ImageSwitchGacha from '../ImageSwitchGacha';
import gachaMachine from '../../assets/gachapon1.png';
import gachaMachine1 from '../../assets/gachapon.gif';
import collectionData from '../../assets/data/collection.json'; // Import collection.json

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

      {popupMessage && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-solid max-w-sm text-center">
            <h2 className="text-xl font-bold text-green-500 mb-2">Gacha Result</h2>
            <p className="text-lg text-gray-800">{popupMessage}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gacha;
