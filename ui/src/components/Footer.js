import React from "react";
import "./Footer.css"
import logo from "../assets/logo.svg"; // Replace with the path to your logo file

function Footer() {
  return (
    // <footer>
    //   <div className="footer-logo">
    //     <img src={logo} alt="QueueHero Logo" />
    //   </div>
    //   <p>
    //     &copy; {new Date().getFullYear()} QueueHero. All rights reserved.
    //   </p>
    // </footer>
    <footer>
    <div class="footer-logo">
      <h4>QueueHero</h4>
    </div>
    <div class="footer-links">
      <a href="/terms">Terms &amp; Conditions</a>
      <a href="/privacy">Privacy Policy</a>
    </div>
  </footer>
  );
}

export default Footer;
