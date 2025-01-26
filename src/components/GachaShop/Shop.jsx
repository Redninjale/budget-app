import React, { useState } from 'react';
import currency from '../../assets/currencyIcon.png';
import bow from '../../assets/bow.png';
import starcollar from '../../assets/starcollar.png';
import bellbow from '../../assets/bellbow.png';
import bluebow from '../../assets/bluebow.png';
import yellowbow from '../../assets/yellowbow.png';
import flowercrown from '../../assets/flowercrown.png';

const Shop = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [popupMessage, setPopupMessage] = useState('');

  const items = [
    { name: 'Bow', price: 50, icon: bow, acquired: false },
    { name: 'Star Collar', price: 100, icon: starcollar, acquired: false },
    { name: 'Bell Bow', price: 75, icon: bellbow, acquired: false },
    { name: 'Blue Bow', price: 60, icon: bluebow, acquired: false },
    { name: 'Yellow Bow', price: 70, icon: yellowbow, acquired: false },
    { name: 'Flower Crown', price: 150, icon: flowercrown, acquired: false },
  ];

  const handlePurchase = (itemName) => {
    const updatedItems = items.map((item) =>
      item.name === itemName ? { ...item, acquired: true } : item
    );
    setPurchasedItems(updatedItems);
    setPopupMessage(`You purchased ${itemName}!`);
    setTimeout(() => setPopupMessage(''), 2000); // Remove popup after 2 seconds
  };

  return (
    <div className="special-text pt-5 bg-opacity-80 p-6 rounded-2xl mx-auto">
      <h1 className="text-3xl text-pastel-blue text-center mb-6">Shop</h1>

      {/* Shop Items */}
      <div className="grid grid-cols-2 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white border-4 border-solid p-4 rounded-3xl shadow-lg flex flex-col items-center"
          >
            <img src={item.icon} alt={item.name} className="w-25 h-20 mb-4" />
            <p className="font-bold text-lg mb-2">{item.name}</p>
            <div className="flex items-center mb-4">
              <div className="flex flex-row p-2 text-xl rounded-xl bg-gray-200">
                <img src={currency} alt="Pawcoin" className="w-6 h-6 mr-2" />
                <p className="font-medium">{item.price}</p>
              </div>
            </div>
            {item.acquired ? (
              <p className="text-gray-500 font-medium">Acquired</p>
            ) : (
              <button
                className={`px-4 py-2 rounded-xl border-4 border-solid transition font-bold bg-green-500 hover:bg-green-600 text-black`}
                onClick={() => handlePurchase(item.name)}
              >
                Buy
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Purchase Popup */}
      {popupMessage && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg border-4 border-solid max-w-sm text-center">
            <h2 className="text-xl font-bold text-green-500 mb-2">Purchase Successful!</h2>
            <p className="text-lg text-gray-800">{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
