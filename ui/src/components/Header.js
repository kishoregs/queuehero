import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <h1> <Link to="/" className="brand-name">QueueHero</Link></h1>
      <nav>
        <Link to="/register" className="nav-link">
          Sign Up
        </Link>
        <Link to="/login" className="nav-link">
          Log In
        </Link>
      </nav>
    </header>
  );
}

export default Header;
