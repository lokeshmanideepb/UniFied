import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // For navigation (optional)
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
      // Check if it's loaded
      setLoading( false );
    }
  }, [ isAuthenticated ] );
  const handleLogin = async () =>
  {
    navigate( "/login" );
  };
  const handleLogout = () =>
  {
    logout();
    navigate( "/" );
  };
  if ( !loading )
    return (
      <header className="bg-gray-800 text-white shadow-md fixed w-full top-0 left-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 mr-2 inline-block"
            />
            University Events
          </Link>

          <NavBar isAuthenticated={isAuthenticated && ( user?.preferences != null )} />
          {/* Navigation and Buttons */}
          <div className="flex space-x-4 ml-auto">
            {/* If the user is logged in, show Logout button */}
            {/* Replace the condition with actual login status logic */}

            {isAuthenticated ? (
              <button
                onClick={handleLogout.bind( this )}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin.bind( this )}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
