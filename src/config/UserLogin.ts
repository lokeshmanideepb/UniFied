import msalInstance from "../services/msalInstance"; // Ensure msalInstance is properly initialized
import { AccountInfo } from "@azure/msal-browser";

export const isUserLoggedIn = (): boolean => {
  const accounts: AccountInfo[] = msalInstance.getAllAccounts();
  return accounts.length > 0;
};
