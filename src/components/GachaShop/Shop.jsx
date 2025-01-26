import React from 'react';

import bow from '../../assets/bow.png';
import starcollar from '../../assets/starcollar.png';
import bellbow from '../../assets/bellbow.png';
import bluebow from '../../assets/bluebow.png';
import yellowbow from '../../assets/yellowbow.png';
import flowercrown from '../../assets/flowercrown.png';

const Shop = () => {
  const items = [
    { img: bow },
    { img: starcollar},
    { img: bellbow },
    { img: bluebow },
    { img: yellowbow},
    {img: flowercrown},
  ];

  return (
    <div className="flex flex-col items-center gap-4 pt-6">
      <div className='custom-darkbeige-bg w-70 rounded-md'>
        <h1 className="special-text font-bold text-center">Shop Accessories</h1>
      </div>
      <div className='custom-darkbeige-bg w-70 rounded-md'>
        <div className="grid grid-cols-2 grid-rows-3 gap-3 m-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="shadow-md border-4 custom-darkerbeige-border custom-beige-bg rounded-lg"
            >
              <img
                src={item.img}
                className="mx-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
