import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import msalInstance from "../services/msalInstance"; // Import your MSAL instance
import { AccountInfo } from "@azure/msal-browser";
import type { User } from "../types/User";

interface AuthContextType {
  isAuthenticated: boolean;
  account: AccountInfo | null;
  login: () => void;
  logout: () => void;
  loading: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const loginResponse = await msalInstance.loginPopup();
      setAccount(loginResponse.account);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    msalInstance.logoutPopup().then(() => {
      setAccount(null);
      setIsAuthenticated(false);
    });
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        account,
        login,
        logout,
        loading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
