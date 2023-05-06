import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./ThemeSwitch.css";

const ThemeSwitch = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <button className="theme-switch" onClick={toggleDarkMode}>
      {isDarkMode ? (
        <FontAwesomeIcon icon={faSun} />
      ) : (
        <FontAwesomeIcon icon={faMoon} />
      )}
    </button>
  );
};

export default ThemeSwitch;
