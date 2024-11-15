import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import logo from "../assets/logo.jpg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../pages/AuthContext";
import "../styles/Navbar.css"



const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isAuthenticated !== undefined) {
      // Check if it's loaded
      setLoading(false);
    }
  }, [isAuthenticated]);
  const handleLogin = async () => {
    login();
    navigate("/events");
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <img
          src={logo}
          alt="Logo"
          className="w-10 h-10 mr-2 inline-block"
        />
        UIC Event
      </Link>
      <div className="navbar-links">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        {isAuthenticated ? (
          <Link
            onClick={handleLogout.bind(this)}
          >
            Logout
          </Link>
        ) : (
          <Link
            onClick={handleLogin.bind(this)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
