import React from 'react';
import DailyTask from './Budget/DailyTask';
import budgetBackground from '../assets/budgetbackground.gif';
import menuButton from '../assets/menubutton.png';

const Budget = () => {
  const categories = [
    { name: "HOUSE & UTILITIES", icon: menuButton },
    { name: "FOOD & DRINKS", icon: menuButton },
    { name: "PERSONAL", icon: menuButton },
    { name: "SHOPPING", icon: menuButton },
    { name: "SUBSCRIPTIONS", icon: menuButton },
  ];

  return (
    <div
      className="p-4 pt-16 min-h-screen bg-cover bg-center w-screen"
      style={{ backgroundImage: `url(${budgetBackground})` }}
    >
      <div className="special-text pt-15 bg-opacity-80 p-6 rounded-2xl mx-auto">
        <h1 className="text-3xl text-pastel-blue text-center mb-6">Budget</h1>

        {/* Daily Task Widget */}
        <DailyTask task="Spend less than $120 today!" />

        {/* Categories */}
        <div className="grid grid-cols-2 gap-6 mt-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-pastel-pink text-black py-4 px-4 rounded-lg shadow-md text-center cursor-pointer hover:bg-pastel-blue hover:shadow-lg transition flex flex-col items-center"
            >
              <img src={category.icon} alt={category.name} className="w-12 h-12 mb-2" />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Budget;