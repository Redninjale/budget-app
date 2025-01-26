import React, { useState } from 'react';

const CategoryList = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedCategory(category)}
          >
            <img
              src={category.icon}
              alt={category.name}
              className="w-32 h-32 rounded-lg shadow-md hover:shadow-lg transition"
            />
            <span className="mt-2 text-center font-semibold text-black">
              {category.name}
            </span>
          </div>
        ))}
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
  );
};

export default CategoryList;