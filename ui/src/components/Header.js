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
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/manage-businesses">Business Profiles</Link>
            </li>
          )}
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
