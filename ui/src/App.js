import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ManageBusinessProfiles from "./components/ManageBusinessProfiles";
import EditBusinessProfile from "./components/EditBusinessProfile";
import About from "./components/About";
import Contact from "./components/Contact";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div className="page-container">
        <Header isLoggedIn={isLoggedIn} />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={<Register setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route
              path="/manage-businesses"
              element={<ManageBusinessProfiles />}
            />
            <Route
              path="/edit-business/:id"
              element={<EditBusinessProfile />}
            />

            <Route path="/about" element={<About />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
