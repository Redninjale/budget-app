import React, { useState, useEffect } from 'react';

const DailyTask = ({ task = "Placeholder task from LLM" }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [pawCoins, setPawCoins] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const now = new Date();
    const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return nextDay - now;
  });

  useEffect(() => {
    if (isCompleted) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1000) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleComplete = () => {
    const generatedPawCoins = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    setPawCoins(generatedPawCoins);
    setIsCompleted(true);
    setShowPopup(true);
  };

  return (
    <div className="bg-white text-pastel-green p-4 rounded-md shadow-md mb-6 flex flex-col items-center justify-center" style={{ border: '4px solid', borderColor: 'black', borderStyle: 'solid', borderRadius: '25px' }}>
      <h2 className="text-xl font-bold text-center">Daily Task</h2>
      <p className={`text-center mt-2 ${isCompleted ? "line-through text-gray-500" : "text-brown-800"}`}>{task}</p>

      {!isCompleted && (
        <button
          onClick={handleComplete}
          className="mt-4 border-solid border-4 rounded-3xl bg-pastel-green text-brown-800 py-2 px-6 rounded-md hover:bg-green-500 transition"
        >
          COMPLETED
        </button>
      )}

      {isCompleted && (
        <p className="mt-4 text-center text-gray-600">NEXT TASK IN {formatTime(timeRemaining)}</p>
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-md text-center">
            <h2 className="text-lg font-bold mb-4">Congratulations!</h2>
            <p className="text-brown-800">You earned {pawCoins} Paw Coins!</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 border-solid border-4 rounded-3xl bg-pastel-yellow text-brown-800 py-2 px-6 rounded-md hover:bg-yellow-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyTask;
