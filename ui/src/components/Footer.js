import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <h4>QueueHero</h4>
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
