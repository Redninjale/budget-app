import React from 'react';

const Shop = () => {
  const items = ['Bow Tie', 'Top Hat', 'Flower Crown'];

  return (
    <div>
      <h1 className="special-text text-2xl font-bold text-center">Shop Accessories</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {items.map((item) => (
          <div
            key={item}
            className="special-text py-4 px-4 bg-gray-100 text-center rounded-lg shadow-md"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
