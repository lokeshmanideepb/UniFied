import React from 'react';
import { Navigate } from "react-router-dom";

import { useAuth } from './AuthContext';

interface PrivateRouteProps
{
    element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ( { element } ) =>
{
    const { isAuthenticated } = useAuth();
    console.log( isAuthenticated )
    if ( !isAuthenticated )
    {
        return <Navigate to="/login" />;
    }
    return element;
};

export default PrivateRoute;
