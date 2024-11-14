// src/services/api.ts
import axios from "axios";
import { Event } from "../types/Event";
import { API_URL } from "../config";

export const fetchEvents = async (): Promise<Event[]> => {
  const fetchURL = API_URL + "/events";
  const response = await axios.get<Event[]>(fetchURL);
  return response.data;
};

export const getAccessToken = async (
  authorizationCode: string,
): Promise<any> => {
  const fetchURL = API_URL + "/auth/verify_token";
  const response = await axios.post<JSON>(fetchURL, {
    authorizationCode, // Send the authorization code to the backend
  });

  return response.data;
};
