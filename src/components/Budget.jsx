import React, { useState, useEffect } from 'react';
import DailyTask from './Budget/DailyTask';
import budgetBackground from '../assets/budgetbackground.gif';
import CategoryList from './Budget/CategoryList';
import Savings from './Budget/Savings';
import { getCategoryPurchases } from '../api/categories';
import { getDailyTask } from '../api/mistral_model';

const Budget = () => {
  const [activeTab, setActiveTab] = useState('Budget'); // State for toggling tabs
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track selected category
  const [showRecapPopup, setShowRecapPopup] = useState(false); // State to track recap popup visibility
  const [task, setTask] = useState("Spend less than $120 today!");
  const [monthlySummary, setMonthlySummary] = useState(`
    In May, $642.77 was spent on Food & Drinks, with the majority going to Claw Cuisine and Whisker Treats. 
    Consider purchasing in bulk from a single merchant to save on delivery fees. $429.05 was spent on Shopping, with Fur-niture Co. and 
    Feline Fabrics being the top merchants. Look for sales or discounts to reduce costs in this category. 
    Overall, $1071.82 was spent in May, with a significant portion going towards Food & Drinks and Shopping.`)

  // Hardcoded savings data
  const savingsGoal = 1000;
  const savingsDeposits = [
    { date: '2024-01-01', amount: 200 },
    { date: '2024-02-01', amount: 150 },
    { date: '2024-03-01', amount: 250 },
  ];
  const totalSaved = savingsDeposits.reduce((sum, deposit) => sum + deposit.amount, 0);

  const [categories, setCategories] = useState([
    {
      name: 'House & Utilities',
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
      name: 'Food & Drinks',
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
      name: 'Personal',
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
      name: 'Shopping',
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
      name: 'Subscriptions',
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
  ]);

  useEffect(() => {
    const fetchCategoryPurchases = async () => {
      const updatedCategories = await Promise.all(
        categories.map(async (category) => {
          const purchases = await getCategoryPurchases(category.name, "01", "2024");
          return {
            ...category,
            transactions: [...category.transactions, ...purchases.transactions],
          };
        })
      );
      console.log(updatedCategories);
      setCategories(updatedCategories);
    };

    const fetchDailyTask = async () => {
      const newTask = await getDailyTask();
      setTask(newTask);
    }

    fetchCategoryPurchases();
    fetchDailyTask();
  }, []);

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
      className="p-4 pt-30 min-h-screen bg-cover bg-center w-screen"
      style={{ backgroundImage: `url(${budgetBackground})` }}
    >
      {/* Tabs */}
      <div className="flex text-xl justify-center special-text space-x-4">
        <button
          className={`px-4 font-bold border-solid border-2 rounded-md shadow-md transition ${activeTab === 'Budget' ? 'text-blue-400' : 'text-gray-400'
            }`}
          onClick={() => setActiveTab('Budget')}
        >
          Budget
        </button>
        <button
          className={`px-4 py-2 font-bold border-solid border-2 rounded-md shadow-md transition ${activeTab === 'Savings' ? 'text-blue-400' : 'text-gray-400'
            }`}
          onClick={() => setActiveTab('Savings')}
        >
          Savings
        </button>
      </div>

      {activeTab === 'Budget' && (
        <div className="special-text pt-9 bg-opacity-80 p-6 rounded-2xl mx-auto">
          <h1 className="text-3xl text-pastel-blue text-center mb-6">Budget</h1>

          {/* Daily Task Widget */}
          <DailyTask task={task} />

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
                <h2 className="text-lg font-bold text-center mb-4">Monthly Recap</h2>

                {/* Budget Progress */}
                <div className="mb-4">
                  <p className="text-center text-gray-800 font-medium">
                    Total Budget: ${totalBudget.toFixed(2)}
                  </p>
                  <p className="text-center text-gray-800 font-medium">
                    Total Spent: ${totalSpent.toFixed(2)}
                  </p>
                  <div className="h-4 rounded-lg overflow-hidden bg-gray-200">
                    <div
                      className={`h-full ${totalSpent > totalBudget ? 'bg-red-500' : 'bg-green-500'
                        }`}
                      style={{ width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-1 text-sm font-medium text-gray-600">
                    {totalSpent > totalBudget
                      ? `Over budget by $${(totalSpent - totalBudget).toFixed(2)}`
                      : `Under budget by $${(totalBudget - totalSpent).toFixed(2)}`}
                  </p>
                </div>

                {/* Savings Progress */}
                <div>
                  <p className="text-center text-gray-800 font-medium">
                    Savings Goal: ${savingsGoal.toFixed(2)}
                  </p>
                  <p className="text-center text-gray-800 font-medium">
                    Total Saved: ${totalSaved.toFixed(2)}
                  </p>
                  <div className="h-4 rounded-lg overflow-hidden bg-gray-200">
                    <div
                      className={`h-full ${totalSaved >= savingsGoal ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                      style={{ width: `${Math.min((totalSaved / savingsGoal) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-center mt-1 text-sm font-medium text-gray-600">
                    {totalSaved >= savingsGoal
                      ? `Goal Achieved! 🎉`
                      : `$${(savingsGoal - totalSaved).toFixed(2)} left to reach your goal`}
                  </p>
                </div>

                <div className='mt-5'>
                  <p className='text-center text-gray-800 font-medium'>Monthly Summary</p>
                  <p className='text-sm text-gray-800'>{monthlySummary}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'Savings' && <Savings />}
    </div>
  );
};

export default Budget;