import React, { useState } from 'react';
import DailyTask from './Budget/DailyTask';
import budgetBackground from '../assets/budgetbackground.gif';
import CategoryList from './Budget/CategoryList';

const Budget = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
  const [showRecapPopup, setShowRecapPopup] = useState(false); // State to track recap popup visibility

  const categories = [
    {
      name: 'HOUSE & UTILITIES',
      icon: 'src/assets/house_cat.png',
      transactions: [
        {
          merchant_id: 'Electricity Co.',
          medium: 'balance',
          purchase_date: '2024-02-27',
          amount: '150.00',
          status: 'completed',
          description: 'Monthly electricity bill',
        },
        {
          merchant_id: 'Water Utility',
          medium: 'balance',
          purchase_date: '2024-02-20',
          amount: '80.00',
          status: 'completed',
          description: 'Water utility bill',
        },
      ],
    },
    {
      name: 'FOOD & DRINKS',
      icon: 'src/assets/food_cat.png',
      transactions: [
        {
          merchant_id: 'Feline Feast',
          medium: 'balance',
          purchase_date: '2024-02-27',
          amount: '34.61',
          status: 'completed',
          description: 'Purchase at Feline Feast',
        },
        {
          merchant_id: 'Coffee Shop',
          medium: 'credit',
          purchase_date: '2024-02-25',
          amount: '12.50',
          status: 'completed',
          description: 'Morning coffee run',
        },
      ],
    },
    {
      name: 'PERSONAL',
      icon: 'src/assets/personal_cat.png',
      transactions: [
        {
          merchant_id: 'Pharmacy',
          medium: 'credit',
          purchase_date: '2024-02-22',
          amount: '25.00',
          status: 'completed',
          description: 'Medication purchase',
        },
      ],
    },
    {
      name: 'SHOPPING',
      icon: 'src/assets/shop_cat.png',
      transactions: [
        {
          merchant_id: 'Online Store',
          medium: 'credit',
          purchase_date: '2024-02-20',
          amount: '120.00',
          status: 'completed',
          description: 'Clothing purchase',
        },
      ],
    },
    {
      name: 'SUBSCRIPTIONS',
      icon: 'src/assets/sub_cat.png',
      transactions: [
        {
          merchant_id: 'Electricity Co.',
          medium: 'balance',
          purchase_date: '2024-02-27',
          amount: '150.00',
          status: 'completed',
          description: 'Monthly electricity bill',
        },
        {
          merchant_id: 'Water Utility',
          medium: 'balance',
          purchase_date: '2024-02-20',
          amount: '80.00',
          status: 'completed',
          description: 'Water utility bill',
        },
      ],
    },
  ];

  const calculateMonthlyRecap = () => {
    const totalSpent = categories.reduce((sum, category) => {
      return (
        sum +
        category.transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0)
      );
    }, 0);

    const totalBudget = categories.length * 100; // Assume default budget for each category is $100

    return { totalSpent, totalBudget };
  };

  const { totalSpent, totalBudget } = calculateMonthlyRecap();

  return (
    <div
      className="p-4 pt-16 min-h-screen bg-cover bg-center w-screen"
      style={{ backgroundImage: `url(${budgetBackground})` }}
    >
      <div className="special-text pt-15 bg-opacity-80 p-6 rounded-2xl mx-auto">
        <h1 className="text-3xl text-pastel-blue text-center mb-6">Budget</h1>

        {/* Daily Task Widget */}
        <DailyTask task="Spend less than $120 today!" />

        {/* Monthly Recap Section */}
        <div
          className="mt-6 mb-6 border-solid border-4 p-4 rounded-3xl bg-white flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          onClick={() => setShowRecapPopup(true)}
        >
          <img src={'src/assets/recap_cat.png'} alt="Monthly Recap" className="w-24 h-24" />
          <p className="text-lg font-bold text-gray-800 mt-2">Monthly Recap</p>
          <p className="text-sm text-gray-600">Click to see details</p>
        </div>

        {/* Categories */}
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Recap Popup */}
        {showRecapPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md relative">
              <button
                className="absolute top-2 right-2 bg-gray-700 text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-800"
                onClick={() => setShowRecapPopup(false)}
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-center mb-4">Monthly Spending Recap</h2>
              <p className="text-center mb-2 text-gray-800">
                <strong>Total Spent:</strong> ${totalSpent.toFixed(2)}
              </p>
              <p className="text-center mb-4 text-gray-800">
                <strong>Total Budget:</strong> ${totalBudget.toFixed(2)}
              </p>
              <div className="h-4 rounded-lg overflow-hidden bg-gray-200">
                <div
                  className={`h-full ${totalSpent > totalBudget ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
