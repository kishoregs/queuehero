import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data);
        setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      setUser(response.data.user);
      setIsLoggedIn(true);
      history.push("/"); // Redirect to the home page after successful login
    } catch (error) {
      throw error;
    }
  };

  const register = async (data) => {
    try {
      const response = await api.post("/users", data);
      setUser(response.data.user);
      setIsLoggedIn(true);
      history.push("/"); // Redirect to the home page after successful registration
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser(null);
      setIsLoggedIn(false);
      history.push("/"); // Redirect to the home page after successful logout
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
