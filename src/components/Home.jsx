import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-16">
      <h1 className="text-3xl font-bold mb-4">Welcome to Pawcoin!</h1>
      <p className="text-gray-600">Your cats are relaxing...</p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="w-32 h-32 bg-yellow-300 rounded-full"></div>
        <div className="w-32 h-32 bg-pink-300 rounded-full"></div>
        <div className="w-32 h-32 bg-blue-300 rounded-full"></div>
        <div className="w-32 h-32 bg-green-300 rounded-full"></div>
      </div>
    </div>
  );
};

export default Home;