import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.svg"; // Replace with the path to your logo file
// import SearchBar from "./SearchBar";

function Header() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <header>
      <nav>
        <div className="logo">
          {isLoggedIn ? (
            <Link to="/dashboard">QueueHero</Link>
          ) : (
            <Link to="/">QueueHero</Link>
          )}
        </div>

        <ul className="nav-links">
          {isLoggedIn && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/manage-businesses">Business</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">{user.name}</Link>
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
