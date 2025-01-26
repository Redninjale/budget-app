import React, { useState } from 'react';
import currency from '../../assets/currencyIcon.png';
import bow from '../../assets/bow.png';
import starcollar from '../../assets/starcollar.png';
import bellbow from '../../assets/bellbow.png';
import bluebow from '../../assets/bluebow.png';
import yellowbow from '../../assets/yellowbow.png';
import flowercrown from '../../assets/flowercrown.png';

const Shop = () => {
  const [purchasedItems, setPurchasedItems] = useState({}); // State to track purchased items

  const accessories = [
    { id: 1, name: 'Bow', image: bow, price: 150 },
    { id: 2, name: 'Star Collar', image: starcollar, price: 200 },
    { id: 3, name: 'Bell Bow', image: bellbow, price: 100 },
    { id: 4, name: 'Blue Bow', image: bluebow, price: 180 },
    { id: 5, name: 'Yellow Bow', image: yellowbow, price: 130 },
    { id: 6, name: 'Flower Crown', image: flowercrown, price: 250 },
  ];

  const handlePurchase = (id) => {
    setPurchasedItems((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="special-text pt-9 bg-opacity-80 p-6 rounded-2xl mx-auto">
      <h1 className="text-3xl text-pastel-blue text-center mb-6">Accessories Store</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {accessories.map((item) => (
          <div
            key={item.id}
            className="border-4 border-solid rounded-3xl bg-white shadow-lg p-4 flex flex-col items-center"
          >
            {/* Accessory Image */}
            <img src={item.image} alt={item.name} className="w-24 h-24 mb-4 rounded-lg" />
            <h3 className="text-lg font-semibold text-black mb-2">{item.name}</h3>

            {/* Price Section */}
            <div className="flex items-center mb-4">
              <img src={currency} alt="Pawcoin" className="w-6 h-6 mr-2" />
              <span className="text-gray-800 text-lg font-medium">{item.price} Pawcoins</span>
            </div>

            {/* Purchase Button */}
            <button
              onClick={() => handlePurchase(item.id)}
              disabled={purchasedItems[item.id]}
              className={`px-4 py-2 rounded-md font-bold transition ${
                purchasedItems[item.id]
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-black border-solid border-4 hover:bg-blue-600'
              }`}
            >
              {purchasedItems[item.id] ? 'Purchased' : 'Purchase'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
