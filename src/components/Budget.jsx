import React, { useState } from 'react';
import DailyTask from './Budget/DailyTask';
import budgetBackground from '../assets/budgetbackground.gif';
import CategoryList from './Budget/CategoryList';

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
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};

export default Budget;
