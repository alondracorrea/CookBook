import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Welcome!</h1>
      </div>
      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/categories">Recipes</Link>
        </li>
        <li className="nav-item">
          {" "}
          <Link to="/contribute">Contribute</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
