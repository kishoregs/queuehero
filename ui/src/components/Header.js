import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.svg"; // Replace with the path to your logo file
// import SearchBar from "./SearchBar";

function Header({ isLoggedIn }) {
  return (
    <header>
      <nav>
        <div class="logo">
          <Link to="/">QueueHero</Link>
        </div>
        <ul class="nav-links">
        {isLoggedIn && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/manage-businesses">Business Profiles</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
