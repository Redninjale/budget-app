import React from 'react';
import CategoryView from './Budget/CategoryView';

const Budget = () => {
  return (
    <div className="p-4 pt-16">
      <h1 className="text-2xl font-bold">Budget</h1>
      <div className="mt-4">
        <CategoryView />
      </div>
    </div>
  );
};

export default Budget;