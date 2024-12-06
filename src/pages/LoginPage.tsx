import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, postUserData } from "../services/api"; // Your API calls
import type { User } from "../types/User";
import { useAuth } from "./AuthContext";

const LoginPage: React.FC = () =>
{
  const { isAuthenticated, account, login, setUser } = useAuth();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState( true );
  const [ userLoading, setUserLoading ] = useState( false );
  // Function to handle user logic
  const storeUser = useCallback( async () =>
  {
    setUserLoading( true );
    if ( account?.username )
    {
      try
      {
        // Step 1: Check if the user exists
        let userData = await getUserData();
        if ( userData )
        {
          setUser( userData );
          localStorage.setItem( "user", JSON.stringify( userData ) );

          // Navigate based on preferences
          if ( userData.preferences )
          {
            navigate( "/events" );
          } else
          {
            navigate( "/onboarding" );
          }
        } else
        {
          // Step 2: Create new user if not found
          const newUser: User = {
            email: account.username,
            username: account.username,
            fullName: account.name || "User", // Default to "User" if fullName is missing
            preferences: null, // Placeholder for preferences
          };

          userData = await postUserData( newUser );
          setUser( userData );

          // Navigate to onboarding after user creation
          navigate( "/onboarding" );
        }
      } catch ( error )
      {
        console.error( "Error storing user:", error );
      }
      finally
      {
        setUserLoading( false );
      }
    }
    setLoading( false );
  }, [ account, navigate, setUser ] );

  // Effect to trigger storeUser after account updates
  useEffect( () =>
  {
    if ( account?.username )
    {
      storeUser();
    }
  }, [ account, storeUser ] );

  // Effect to handle authentication state
  useEffect( () =>
  {
    if ( isAuthenticated !== undefined )
    {
      setLoading( false ); // Stop loading once isAuthenticated is determined
    }
  }, [ isAuthenticated ] );

  // Handle login
  const handleLogin = async () =>
  {
    setLoading( true ); // Start loading while login is in progress
    login(); // Trigger OAuth login
  };

  if ( loading || userLoading )
  {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to UIC Events
        </h1>
        <p>Please log in</p>
        <button
          onClick={handleLogin}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login with Microsoft
        </button>
        <p className="mt-4 text-gray-600 text-sm text-center">
          By signing up, you subscribe to receive emails related to your preferences.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
