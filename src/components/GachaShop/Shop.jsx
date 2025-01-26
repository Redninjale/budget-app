import React from 'react';

import bow from '../../assets/bow.png';

const Shop = () => {
  const items = [
    { img: bow },
    { img: '/images/top-hat.png' },
    { img: '/images/flower-crown.png' },
  ];

  return (
    <div className="p-4">
      <h1 className="special-text font-bold text-center">Shop Accessories</h1>
      <div className="bg-brown-500 grid grid-cols-3 gap-7 transform scale-90">
        {items.map((item) => (
          <div
            key={item.name}
            className="border-4 border-indigo-500 rounded-lg"
          >
            <img
              src={item.img}
              className="mx-auto rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
