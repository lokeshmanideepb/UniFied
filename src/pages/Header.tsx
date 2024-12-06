import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import NavBar from "../components/NavBar";
import { useAuth } from "./AuthContext";

const Header: React.FC = () =>
{
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const [ loading, setLoading ] = useState( true );

  useEffect( () =>
  {
    if ( isAuthenticated !== undefined )
    {
      setLoading( false ); // Once isAuthenticated is defined, stop loading
    }
  }, [ isAuthenticated ] );

  const handleLogin = () =>
  {
    navigate( "/login" );
  };

  const handleLogout = () =>
  {
    logout();
    navigate( "/" );
  };

  if ( loading )
  {
    return null; // You could show a loader here if needed
  }

  return (
    <header className="bg-gray-800 text-white shadow-md fixed w-full top-0 left-0 z-10">
      <div className="container mx-auto px-6 py-4 flex items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-white flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 mr-2 inline-block"
          />
          UIC Events
        </Link>

        {/* Navigation Bar */}
        <NavBar isAuthenticated={isAuthenticated && user?.preferences != null} />

        {/* Navigation and Buttons */}
        <div className="flex space-x-4 ml-auto">
          {/* Display user info if authenticated */}
          {isAuthenticated && user && (
            <div className="mr-4 py-2 text-right">
              <span className="text-lg font-bold">{user.fullName}</span>
              <br />
              <span className="text-sm font-extralight">{user.email}</span>
            </div>
          )}

          {/* Conditional buttons */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 mt-2 h-12 align-middle rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 mt-2 h-12 align-middle rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
