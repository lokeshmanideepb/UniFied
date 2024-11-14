import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import msalInstance from "../services/msalInstance"; // Import your MSAL instance
import { AccountInfo } from "@azure/msal-browser";

interface AuthContextType {
  isAuthenticated: boolean;
  account: AccountInfo | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountInfo | null>(null);

  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup();
      setAccount(loginResponse.account);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    msalInstance.logoutPopup().then(() => {
      setAccount(null);
      setIsAuthenticated(false);
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, account, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
