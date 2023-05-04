import React from "react";
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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="page-container">
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
                element={<ProtectedRoute component={ManageBusinessProfiles} />}
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
            </Routes>
          </div>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
