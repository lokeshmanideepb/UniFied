// src/authConfig.ts
import { Configuration, LogLevel } from "@azure/msal-browser";
import { CLIENT_ID, TENANT_ID } from "../config";
export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/common/${TENANT_ID}`,
    redirectUri: "/login",
    postLogoutRedirectUri: "/",
  },
  cache: {
    cacheLocation: "sessionStorage", // or "localStorage"
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (_, message) => {
        console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Calendars.ReadWrite"],
};
