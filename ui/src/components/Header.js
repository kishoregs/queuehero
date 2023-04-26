import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; // Replace with the path to your logo file

function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="brand-logo">
          <img src={logo} alt="QueueHero Logo" />
        </Link>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          {/* Add more navigation links as needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
