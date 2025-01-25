import React from 'react';

const CategoryView = () => {
  const categories = ['Food', 'Transportation', 'Entertainment', 'Savings'];

  return (
    <div>
      <h2 className="text-xl font-bold">Categories</h2>
      <ul className="mt-4">
        {categories.map((category) => (
          <li key={category} className="py-2 px-4 bg-gray-100 my-2 rounded-lg">
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryView;
