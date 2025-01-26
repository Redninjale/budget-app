// DailyTask.js
import React from 'react';

const DailyTask = ({ task }) => {
  return (
    <div className="bg-pastel-yellow text-pastel-green p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-center">Daily Task</h2>
      <p className="text-center mt-2">{task}</p>
    </div>
  );
};

export default DailyTask;
