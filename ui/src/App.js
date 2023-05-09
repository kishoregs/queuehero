import React, { useContext } from "react";
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
import Logout from "./components/Logout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeContext } from "./context/ThemeContext";
import Profile from "./components/Profile/Profile";
import NewBusinessProfile from "./components/NewBusinessProfile";

function App() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const themeClass = isDarkMode ? "dark-mode" : "";

  return (
    <div className={`app-body ${themeClass}`}>
      <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        <AuthProvider>
          <Router>
            <div>
              <Header />
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard"
                    element={<ProtectedRoute component={Dashboard} />}
                  />

                  <Route
                    path="/manage-businesses"
                    element={
                      <ProtectedRoute component={ManageBusinessProfiles} />
                    }
                  />
                  <Route
                    path="/edit-business/:id"
                    element={<ProtectedRoute component={EditBusinessProfile} />}
                  />

                  <Route path="/about" element={<About />} />

                  <Route path="/contact" element={<Contact />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route
                    path="/profile"
                    element={<ProtectedRoute component={Profile} />}
                  />
                  <Route
                    path="/create-business-profile"
                    element={<ProtectedRoute component={NewBusinessProfile} />}
                  />
                </Routes>
              </div>

              <Footer />
            </div>
          </Router>
        </AuthProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
