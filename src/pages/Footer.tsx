import React from "react";
import { Link } from "react-router-dom"; // For navigation (optional)
import logo from "../assets/logo.jpg";
import { AccountInfo } from "@azure/msal-browser";
import { useNavigate } from "react-router-dom";
const Footer: React.FC = ( { } ) =>
{


    return (
        <footer className="w-full bg-blue-600 text-white py-6 left-0 bottom-0">
            <div className="container mx-auto text-center px-4">
                <p>&copy; 2024 University Events. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-4">
                    <Link to="/terms" className="hover:underline">
                        Terms of Service
                    </Link>
                    <Link to="/privacy" className="hover:underline">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
