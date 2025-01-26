import React, { useState } from 'react';
import coinCat from '../../assets/coin_cat.png';

const Savings = () => {
  const [savingsGoal, setSavingsGoal] = useState(1000); // Default savings goal
  const [isEditingGoal, setIsEditingGoal] = useState(false); // State for editing mode
  const [sortOrder, setSortOrder] = useState('high-to-low'); // State for sorting order
  const deposits = [
    { date: '2024-01-01', amount: 200 },
    { date: '2024-02-01', amount: 150 },
    { date: '2024-03-01', amount: 250 },
  ]; // Hardcoded deposits

  const sortedDeposits = [...deposits].sort((a, b) =>
    sortOrder === 'low-to-high' ? a.amount - b.amount : b.amount - a.amount
  );

  const totalSaved = deposits.reduce((sum, deposit) => sum + deposit.amount, 0); // Calculate total saved
  const progress = (totalSaved / savingsGoal) * 100; // Calculate progress percentage

  const handleSavingsGoalChange = (e) => {
    setSavingsGoal(parseFloat(e.target.value) || 0); // Update savings goal
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'low-to-high' ? 'high-to-low' : 'low-to-high'));
  };

  return (
    <div className="special-text pt-9 bg-opacity-80 p-6 rounded-2xl mx-auto">
      <h1 className="text-3xl text-pastel-blue text-center mb-6">Savings</h1>

      <div className="bg-white border-4 border-solid p-7 rounded-3xl">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <img src={coinCat} alt="Savings Icon" className="w-36 h-36" />
        </div>

        {/* Savings Goal */}
        <div className="mb-6 text-center">
          <p className="text-lg font-medium text-gray-800 mb-2">
            Your Savings Goal: ${savingsGoal.toFixed(2)}
          </p>

          {/* Edit Button */}
          {!isEditingGoal && (
            <button
              onClick={() => setIsEditingGoal(true)}
              className="px-4 py-2 bg-blue-500 text-black border-solid border-4 rounded-xl hover:bg-blue-600 transition"
            >
              EDIT GOAL
            </button>
          )}

          {/* Editable Input */}
          {isEditingGoal && (
            <div className="mt-4">
              <input
                type="number"
                className="border border-gray-300 rounded-lg p-2 w-full text-center"
                defaultValue={savingsGoal}
                onBlur={(e) => {
                  handleSavingsGoalChange(e);
                  setIsEditingGoal(false); // Exit editing mode after updating
                }}
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-5 rounded-lg overflow-hidden bg-gray-200">
            <div
              className={`h-full ${progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-center mt-2 text-sm text-gray-600">
            {progress >= 100
              ? 'Goal Achieved! 🎉'
              : `${(savingsGoal - totalSaved).toFixed(2)} left to reach your goal`}
          </p>
        </div>
      </div>

      {/* Deposit List */}
      <div className="bg-white shadow-lg p-4 mt-7 border-4 border-solid rounded-3xl">
        <h2 className="text-lg font-bold text-gray-800 mb-4 text-center text-xl p-2">
          Deposits
        </h2>

        {/* Sort Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 bg-gray-200 text-black border border-gray-400 rounded-lg hover:bg-gray-300 transition"
          >
            Sort: {sortOrder === 'low-to-high' ? 'Low to High' : 'High to Low'}
          </button>
        </div>

        <ul className="space-y-2">
          {sortedDeposits.map((deposit, index) => {
            const isLatest = deposit === deposits[deposits.length - 1]; // Check if it's the latest deposit
            return (
              <li
                key={index}
                className={`border p-3 rounded-md flex justify-between ${
                  isLatest ? 'bg-blue-100 border-blue-500' : 'border-gray-300'
                }`}
              >
                <span>{deposit.date}</span>
                <span className="font-bold text-gray-800">
                  ${deposit.amount.toFixed(2)}
                  {isLatest && (
                    <span className="ml-2 text-blue-500 text-sm font-semibold">
                      (Latest Deposit)
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Savings;
