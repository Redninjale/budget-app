import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Budget from './components/Budget';
import GachaShop from './components/GachaShop';
import bg from './assets/currencybg.png';
import currency from './assets/currencyIcon.png';

const App = () => {

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Router>
        {/* Dropdown Menu */}
        <div className="flex flex-row items-center justify-center absolute p-4">
          <div className='flex flex-row space-x-4'>
            <Link
              to="/"
              className="bg-[url('./assets/menubutton.png')] w-18 h-19 items-center justify-center bg-center bg-center rounded-md"
            >
            </Link>
            <Link
              to="/budget"
              className="bg-[url('./assets/budgetbutton.png')] w-18 h-19 items-center justify-center bg-center bg-center rounded-md"
            >
            </Link>
            <Link
              to="/Gacha-Shop"
              className="bg-[url('./assets/shopbutton.png')] w-18 h-19 items-center justify-center bg-center bg-center rounded-md"
            >
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/gacha-shop" element={<GachaShop />} />
          </Routes>
        </div>
      </Router>
      <div className='flex flex-row items-center special-text text-3xl absolute bottom-0 left-0 gap-2 bg-cover h-15 w-40' style={{backgroundImage : `url(${bg})`}}>
        <Router>
          <img className='w-6 h-6' src={currency}></img>
          <div>1000</div>
        </Router>
      </div>
    </div>
  );
};

export default App;
