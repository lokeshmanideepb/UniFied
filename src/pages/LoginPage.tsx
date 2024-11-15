import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getUserData, postUserData } from "../services/api"; // Your API calls
import type { User } from "../types/User";

const LoginPage: React.FC = () => {
  const { isAuthenticated, account, login, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Function to check the user and perform necessary actions
  const storeUser = async () => {
    if (account?.username) {
      // Step 1: Check if the user exists in the database using the email
      let userData = await getUserData(account.username);

      if (userData) {
        setUser(userData);
        // Step 2: If the user exists, check if preferences are set
        if (userData.preferences) {
          // If preferences exist, navigate to /events
          navigate("/events");
        } else {
          // If preferences are not set, navigate to /onboarding
          navigate("/onboarding");
        }
      } else {
        // Step 3: If the user does not exist, create a new user
        const newUser: User = {
          email: account.username,
          username: account.username,
          fullName: account.name,
          preferences: null, // Placeholder for user preferences
        };

        userData = await postUserData(newUser);
        setUser(userData);
        // After user creation, redirect to onboarding page
        navigate("/onboarding");
      }
    }
  };

  // Effect to trigger storeUser after account is updated
  useEffect(() => {
    if (account?.username) {
      storeUser();
    }
  }, [account]); // This runs whenever the account state changes

  // Handle login
  const handleLogin = async () => {
    setLoading(true); // Set loading to true while login is happening
    login(); // Trigger OAuth login (this will update the account state)
  };
  useEffect(() => {
    if (isAuthenticated === undefined) return; // Avoid unnecessary updates when isAuthenticated is undefined

    // If already authenticated, go to events page
    if (isAuthenticated) {
      navigate("/events");
    }
    setLoading(false); // Make sure to set loading to false when effect is done
  }, [isAuthenticated, navigate]); // Dependency array ensures useEffect runs only when isAuthenticated or navigate changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to University Events
        </h1>
        <p>Please log in</p>
        <button
          onClick={handleLogin}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login with Microsoft
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
