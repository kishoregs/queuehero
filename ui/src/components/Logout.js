// Logout.js
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../auth";
import { AuthContext } from "../context/AuthContext";


const Logout = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    logout();
    // Set isLoggedIn to false
    setIsLoggedIn(false);
    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
