import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Budget from './components/Budget';
import GachaShop from './components/GachaShop';

const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        {/* Dropdown Menu */}
        <div className="absolute p-4">
          <button
            onClick={toggleDropdown}
            className="bg-[url('./assets/menubutton.png')] w-18 h-19 items-center justify-center bg-center bg-center rounded-md"
          >
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-40 bg-white shadow-lg rounded-md">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/budget"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Budget
              </Link>
              <Link
                to="/gacha-shop"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Gacha Shop
              </Link>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/gacha-shop" element={<GachaShop />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
