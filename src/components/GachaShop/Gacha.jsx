import React from 'react';

const Gacha = () => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Gacha Machine</h1>
      <p className="text-gray-600 mt-2">Roll for a chance to collect new cats!</p>
      <button className="mt-4 py-2 px-6 bg-yellow-400 text-white rounded-lg">Roll</button>
    </div>
  );
};

export default Gacha;
