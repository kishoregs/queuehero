import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; // Replace with the path to your logo file
// import SearchBar from "./SearchBar";

function Header({ isLoggedIn }) {
  return (
    <header>
      <nav>
        <Link to="/" className="brand-logo">
          <img src={logo} alt="QueueHero Logo" />
        </Link>

        <ul>
          {/* <li>
            <SearchBar />
          </li> */}
          {isLoggedIn && (
            <li>
              <Link to="/manage-businesses">Manage Business Profiles</Link>
            </li>
          )}
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
