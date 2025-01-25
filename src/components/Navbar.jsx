import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 right-0 flex justify-around py-4 z-10">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/budget" className="hover:underline">Budget</Link>
      <Link to="/gacha-shop" className="hover:underline">Gacha/Shop</Link>
    </nav>
  );
};

export default Navbar;