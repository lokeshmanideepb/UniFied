// src/msalInstance.ts
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../config/authConfig";

const msalInstance = new PublicClientApplication(msalConfig);
(async () => {
  await msalInstance.initialize();
})();

export default msalInstance;
