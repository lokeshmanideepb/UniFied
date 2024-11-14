// src/pages/LoginPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext';


const LoginPage: React.FC = ( { } ) =>
{
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState( true );
    useEffect( () =>
    {
        if ( isAuthenticated !== undefined )
        { // Check if it's loaded
            if ( isAuthenticated )
            {
                navigate( "/events" );
            }
            setLoading( false );
        }
    }, [ isAuthenticated, navigate ] );

    const { login } = useAuth();

    const handleLogin = () =>
    {
        login();
        navigate( "/events" )
    };
    if ( loading )
    {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Welcome to University Events</h1>
                <p>Please log in</p>
                <button
                    onClick={handleLogin.bind( this )}
                    className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                    Login with Microsoft
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
