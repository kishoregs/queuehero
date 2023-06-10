import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Header.css";

// import SearchBar from "./SearchBar";

function Header() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // ref to track the dropdown element
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // if the click is outside of the dropdown, then close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // add the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // empty dependency array ensures this only runs once
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
              <div className="profile-dropdown" ref={dropdownRef}>
                <img
                  className="header-profile-image"
                  src={
                    user.profilePhoto
                      ? `${process.env.REACT_APP_API_BASE_URL}/${user.profilePhoto}`
                      : "/default-profile-picture.png"
                  }
                  alt="Profile"
                  title={user.name} // Tooltip will display user's name
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
