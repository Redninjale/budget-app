import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Budget from './components/Budget';
import GachaShop from './components/GachaShop';
import bg from './assets/currencybg.png';
import currency from './assets/currencyIcon.png';
import ticket from './assets/ticketIcon.png';
import { createContext } from 'react';

export const TicketsContext = createContext();
export const PawCoinContext = createContext();

const App = () => {
  const [pawCoins, setPawCoins] = useState(1000);
  const [tickets, setTickets] = useState(100);

  useEffect(() => {
    if (localStorage.getItem("pawCoins")) {
      setPawCoins(localStorage.getItem("pawCoins"));
    } else {
      localStorage.setItem("pawCoints", pawCoins);
    }

    if (localStorage.getItem("tickets")) {
      setTickets(localStorage.getItem("tickets"));
    } else {
      localStorage.setItem("tickets", tickets);
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Router>
        {/* Dropdown Menu */}
        <div className="flex flex-row items-center justify-center absolute p-4">
          <div className="flex flex-row space-x-4">
            <div className="flex flex-col items-center">
              <Link
                to="/"
                className="bg-[url('./assets/menubutton.png')] w-18 h-19 items-center justify-center bg-center rounded-md"
              ></Link>
              <Link
                to="/">
              <p className="text-center text-xl text-black bg-white p-1 border-black border-4 rounded-xl mt-2 special-text">Home</p>
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <Link
                to="/budget"
                className="bg-[url('./assets/budgetbutton.png')] w-18 h-19 items-center justify-center bg-center rounded-md"
              ></Link>
              <Link
                to="/budget">
              <p className="text-center text-xl text-black bg-white p-1 border-black border-4 rounded-xl mt-2 special-text">Budget</p>
              </Link>
            </div>
            <div className="flex flex-col items-center">
              <Link
                to="/Gacha-Shop"
                className="bg-[url('./assets/shopbutton.png')] w-18 h-19 items-center justify-center bg-center rounded-md"
              ></Link>
              <Link
                to="/Gacha-Shop">
              <p className="text-center text-xl text-black bg-white p-1 border-black border-4 rounded-xl mt-2 special-text">Gacha</p>
              </Link>
            </div>
          </div>
        </div>

        {/* /* Main Content */}
        <PawCoinContext.Provider value={{ pawCoins, setPawCoins }}>
          <TicketsContext.Provider value={{ tickets, setTickets }}>
            <div className="flex">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/gacha-shop" element={<GachaShop />} />
              </Routes>
            </div>
          </TicketsContext.Provider>
        </PawCoinContext.Provider>
      </Router>

      {/* Currency Section */}
      <div
        className="flex flex-row items-center fixed bottom-7 left-2 gap-4 p-2 rounded-lg bg-cover bg-no-repeat z-50 shadow-md"
        style={{
          backgroundImage: `url(${bg})`,
          width: '200px',
          height: '60px',
        }}
      >
        {/* Currency Icon and Amount */}
        <div className="flex flex-row items-center justify-center gap-1">
          <img className="w-10 h-6 pl-3" src={currency} alt="Currency" />
          <div className="text-center text-white text-xl font-bold">{pawCoins}</div>
        </div>

        {/* Ticket Icon and Amount */}
        <div className="flex flex-row items-center justify-center gap-1">
          <img className="w-6 h-6" src={ticket} alt="Ticket" />
          <div className="text-center text-white text-xl font-bold">{tickets}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
