import React, { useState } from 'react';
import budgetData from '../../assets/data/budget.json'; // Assume this is the JSON file

const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [budgets, setBudgets] = useState(budgetData); // Editable budgets state

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

  return (
    <div>
      {/* Categories Grid */}
      <div className="grid grid-cols-2 gap-6">
        {categories.map((category) => {
          const budgetInfo = budgets[category.name] || { budget: 100 }; // Default budget is 100
          const { totalSpent, progress } = calculateProgress(category.transactions || [], budgetInfo.budget);
          const isOverBudget = totalSpent > budgetInfo.budget;

          // Debugging information
          console.log(`Category: ${category.name}`);
          console.log(`Budget: ${budgetInfo.budget}`);
          console.log(`Total Spent: ${totalSpent}`);
          console.log(`Progress: ${progress}%`);
          console.log(`Is Over Budget: ${isOverBudget}`);

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
                {/* <p className="text-center mt-1 text-sm font-medium text-gray-800">
                  Budget: ${budgetInfo.budget.toFixed(2)}
                </p> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Transaction Popup */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md relative">
            <button
              className="absolute top-2 right-2 bg-gray-700 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-800"
              onClick={() => setSelectedCategory(null)} // Close the pop-up
            >
              &times;
            </button>
            <h2 className="text-lg font-bold text-center mb-4">
              {selectedCategory.name}
            </h2>

            {/* Budget and Progress */}
            <div className="mb-4">
              <p className="text-center text-gray-800 font-medium">
                Budget: ${budgets[selectedCategory.name]?.budget.toFixed(2) || 100}
              </p>
              <div className="h-4 rounded-lg overflow-hidden bg-gray-200">
                <div
                  className={`h-full ${calculateProgress(selectedCategory.transactions, budgets[selectedCategory.name]?.budget || 100).totalSpent > (budgets[selectedCategory.name]?.budget || 100) ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{
                    width: `${Math.min(
                      calculateProgress(selectedCategory.transactions, budgets[selectedCategory.name]?.budget || 100).progress,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Edit Budget */}
            <div className="mb-4">
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                Edit Budget:
              </label>
              <input
                type="number"
                id="budget"
                className="border border-gray-300 rounded-lg p-2 w-full"
                defaultValue={budgets[selectedCategory.name]?.budget || 100}
                onBlur={(e) => handleBudgetChange(selectedCategory.name, e.target.value)}
              />
            </div>

            <ul className="space-y-2">
              {selectedCategory.transactions.map((transaction, index) => (
                <li key={index} className="border border-gray-300 p-3 rounded-md">
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
  );
};

export default CategoryList;
