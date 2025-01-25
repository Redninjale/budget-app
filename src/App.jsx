import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Budget from './components/Budget';
import GachaShop from './components/GachaShop';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Router>
        <Navbar />
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