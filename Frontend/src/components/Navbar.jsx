import React from "react";
import {Link } from "react-router-dom"
const Navbar = () => {
  return (
    <header className="fixed top-0 w-full p-4 z-50 font-BungeeShade text-3xl text-gray-300 text-center">
      <Link to="/" >How is the weather?</Link>
    </header>
  );
};

export default Navbar;