import React, { useState } from 'react';
import DailyTask from './Budget/DailyTask';
import budgetBackground from '../assets/budgetbackground.gif';

const Budget = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category

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
              className="text-black text-xl py-2 px-2 rounded-lg text-center cursor-pointer hover:bg-pastel-blue hover:shadow-lg transition flex flex-col items-center"
              onClick={() => setSelectedCategory(category)} // Handle category click
            >
              <img src={category.icon} alt={category.name} className="w-40 h-50 mb-2" />
              <span className="text-xl">{category.name}</span>
            </div>
          ))}
        </div>

        {/* Transaction Popup */}
        {selectedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md relative">
              <button
                className="absolute top-2 right-2 bg-red-500 text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                onClick={() => setSelectedCategory(null)} // Close the pop-up
              >
                &times;
              </button>
              <h2 className="text-lg font-bold text-center mb-4">{selectedCategory.name}</h2>
              <ul className="space-y-2">
                {selectedCategory.transactions.map((transaction, index) => (
                  <li key={index} className="border border-gray-300 p-3 rounded-md">
                    <p><strong>Merchant:</strong> {transaction.merchant_id}</p>
                    <p><strong>Medium:</strong> {transaction.medium}</p>
                    <p><strong>Date:</strong> {transaction.purchase_date}</p>
                    <p><strong>Amount:</strong> ${transaction.amount}</p>
                    <p><strong>Status:</strong> {transaction.status}</p>
                    <p><strong>Description:</strong> {transaction.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Budget;
