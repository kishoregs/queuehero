import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";
import logo from "../assets/QueueHero.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Footer() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <footer>
      <div className="logo logo-flex">
        {isLoggedIn ? (
          <Link to="/dashboard" className="logo-link">
            <div className="logo-container">
              <img src={logo} alt="QueueHero Logo" className="logo-img" />
              <span className="logo-text">ueueHero</span>
            </div>
          </Link>
        ) : (
          <Link to="/" className="logo-link">
            <div className="logo-container">
              <img src={logo} alt="QueueHero Logo" className="logo-img" />
              <span className="logo-text">ueueHero</span>
            </div>
          </Link>
        )}
      </div>
      <div className="footer-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/terms">Terms &amp; Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <div className="footer-theme-switch">
        <ThemeSwitch />
      </div>
    </footer>
  );
}

export default Footer;
