import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps
{
    isAuthenticated: boolean;
    onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ( { isAuthenticated, onLogout } ) =>
{
    const [ isMenuOpen, setIsMenuOpen ] = useState( false );

    const toggleMenu = () =>
    {
        setIsMenuOpen( !isMenuOpen );
    };

    return (
        <nav className="text-white py-4 px-6">
            <div className="flex">

                <div className="hidden md:flex space-x-6 text-xl">

                    {isAuthenticated && (
                        <>
                            <Link to="/" className="hover:text-white">Home</Link>
                            <Link to="/events" className="hover:text-white">Events</Link>
                            <Link to="/calendar" className="hover:text-white">Calendar</Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
            </div>
        </nav>
    );
};

export default NavBar;
