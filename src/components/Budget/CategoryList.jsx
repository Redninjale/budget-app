// CategoryList.js
import React from 'react';

const CategoryList = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => (
        <div
          key={category}
          className="bg-pastel-pink text-black py-6 px-4 rounded-lg shadow-md text-center cursor-pointer hover:bg-pastel-blue hover:shadow-lg transition"
        >
          {category}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
