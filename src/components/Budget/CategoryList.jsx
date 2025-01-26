import React, { useState } from 'react';
import budgetData from '../../assets/data/budget.json'; // Assume this is the JSON file

const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [budgets, setBudgets] = useState(budgetData); // Editable budgets state
  const [filter, setFilter] = useState('all'); // State for filter
  const [sortOrder, setSortOrder] = useState('none'); // State for sorting categories
  const [transactionSortOrder, setTransactionSortOrder] = useState('none'); // State for sorting transactions

  const calculateProgress = (transactions, budget) => {
    const totalSpent = transactions.reduce((sum, t) => {
      const amount = parseFloat(t.amount);
      if (isNaN(amount)) {
        console.warn(`Invalid transaction amount: ${t.amount}`);
        return sum;
      }
      return sum + amount;
    }, 0);
    const progress = (totalSpent / budget) * 100;
    return { totalSpent, progress };
  };

  const handleBudgetChange = (categoryName, newBudget) => {
    setBudgets((prev) => ({
      ...prev,
      [categoryName]: { budget: parseFloat(newBudget) || 0 },
    }));
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = () => {
    setSortOrder((prev) => (prev === 'low-to-high' ? 'high-to-low' : 'low-to-high'));
  };

  const handleTransactionSortChange = () => {
    setTransactionSortOrder((prev) =>
      prev === 'low-to-high' ? 'high-to-low' : 'low-to-high'
    );
  };

  const filteredCategories = categories.filter((category) => {
    const budgetInfo = budgets[category.name] || { budget: 100 };
    const { totalSpent } = calculateProgress(category.transactions || [], budgetInfo.budget);

    if (filter === 'over') return totalSpent > budgetInfo.budget;
    if (filter === 'under') return totalSpent <= budgetInfo.budget;
    return true; // 'all'
  });

  const sortedCategories = filteredCategories.sort((a, b) => {
    const budgetA = budgets[a.name]?.budget || 100;
    const budgetB = budgets[b.name]?.budget || 100;
    const spentA = calculateProgress(a.transactions || [], budgetA).totalSpent;
    const spentB = calculateProgress(b.transactions || [], budgetB).totalSpent;

    if (sortOrder === 'low-to-high') return spentA - spentB;
    if (sortOrder === 'high-to-low') return spentB - spentA;
    return 0; // Default, no sorting
  });

  return (
    <div>
      {/* Filter and Sort Controls */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <label className="mr-2">Filter:</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border-4 border-black-300 border-solid rounded-lg p-2"
          >
            <option value="all">All</option>
            <option value="over">Over Budget</option>
            <option value="under">Under Budget</option>
          </select>
        </div>
        <button
          onClick={handleSortChange}
          className="bg-blue-500 text-black border-4 border-solid px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Sort: {sortOrder === 'low-to-high' ? 'Low to High' : 'High to Low'}
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-6">
        {sortedCategories.map((category) => {
          const budgetInfo = budgets[category.name] || { budget: 100 }; // Default budget is 100
          const { totalSpent, progress } = calculateProgress(category.transactions || [], budgetInfo.budget);
          const isOverBudget = totalSpent > budgetInfo.budget;

          return (
            <div
              key={category.name}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              <img
                src={category.icon}
                alt={category.name}
                className="w-32 h-32 rounded-lg transition"
              />
              <span className="mt-2 text-center font-semibold text-black">
                {category.name}
              </span>
              {/* Progress Bar */}
              <div className="w-35 mt-2">
                <div className="h-5 rounded-lg border-solid border-4 overflow-hidden bg-gray-200">
                  <div
                    className={`h-full ${isOverBudget ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
                <p className="text-center mt-1 text-sm font-medium text-gray-600">
                  {isOverBudget
                    ? `${(totalSpent - budgetInfo.budget).toFixed(2)} over`
                    : `${(budgetInfo.budget - totalSpent).toFixed(2)} under`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transaction Popup */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border-solid border-4 rounded-3xl p-6 w-3/4 max-w-md relative">
            <button
              className="absolute top-2 right-2 bg-gray-700 text-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-800"
              onClick={() => setSelectedCategory(null)} // Close the pop-up
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-center mb-4">
              {selectedCategory.name}
            </h2>

            {/* Transaction Sort Controls */}
            <div className="flex justify-center items-center mb-4">
              {/* <h3 className="text-md font-semibold text-gray-800">Transactions</h3> */}
              <button
                onClick={handleTransactionSortChange}
                className="bg-blue-500 text-black border-4 border-solid p-2 rounded-lg hover:bg-blue-600"
              >
                Sort: {transactionSortOrder === 'low-to-high' ? 'Low to High' : 'High to Low'}
              </button>
            </div>

            {/* Transaction List */}
            <div className="max-h-96 overflow-y-auto bg-gray-100 rounded-lg shadow-inner p-4 border border-gray-300">
              <ul className="space-y-2">
                {selectedCategory.transactions
                  .slice()
                  .sort((a, b) =>
                    transactionSortOrder === 'low-to-high'
                      ? parseFloat(a.amount) - parseFloat(b.amount)
                      : parseFloat(b.amount) - parseFloat(a.amount)
                  )
                  .map((transaction, index) => (
                    <li key={index} className="border border-gray-300 p-3 rounded-md bg-white shadow-md">
                      <p>
                        <strong>Amount:</strong> ${transaction.amount}
                      </p>
                      <p>
                        <strong>Status:</strong> {transaction.status}
                      </p>
                      <p>
                        <strong>Description:</strong> {transaction.description}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;