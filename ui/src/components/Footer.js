import React from "react";
import logo from "../assets/logo.svg"; // Replace with the path to your logo file

function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <img src={logo} alt="QueueHero Logo" />
      </div>
      <p>
        &copy; {new Date().getFullYear()} QueueHero. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
