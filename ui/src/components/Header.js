import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../assets/logo.svg"; // Replace with the path to your logo file
// import SearchBar from "./SearchBar";

function Header() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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
              <div className="profile-dropdown">
                <img
                  className="header-profile-image"
                  src={
                    user.profilePhoto
                      ? `${process.env.REACT_APP_API_BASE_URL}/${user.profilePhoto}`
                      : "/default-profile-picture.png"
                  }
                  alt="Profile"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" onClick={toggleDropdown}>
                      Profile
                    </Link>
                    <Link to="/logout" onClick={toggleDropdown}>
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
