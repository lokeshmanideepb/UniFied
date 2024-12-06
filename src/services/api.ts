// src/services/api.ts
import axios from "axios";
import { API_URL } from "../config";
import { Event } from "../types/Event";
import type { User } from "../types/User";

export const fetchEvents = async (): Promise<Event[]> => {
  const fetchURL = API_URL + "/events";
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get<Event[]>(fetchURL, config);
  return response.data;
};

export const fetchUserSpecificEvents = async (): Promise<Event[]> => {
  const fetchURL = API_URL + "/v2/events";
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get<Event[]>(fetchURL, config);
  return response.data;
};

export const fetchEvent = async (route_url: string): Promise<Event> => {
  const fetchURL = API_URL + "/event/" + route_url;
  const response = await axios.get<Event>(fetchURL);
  return response.data;
};

export const getAccessToken = async (
  authorizationCode: string
): Promise<any> => {
  const fetchURL = API_URL + "/auth/verify_token";
  const response = await axios.post<JSON>(fetchURL, {
    authorizationCode, // Send the authorization code to the backend
  });

  return response.data;
};

export const getUserData = async (emailAddress: string): Promise<User> => {
  const fetchURL = `${API_URL}/user`;
  const accessToken = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios.get(fetchURL, config);
  return response.data;
};

export const postUserData = async (data: User): Promise<User> => {
  const fetchURL = API_URL + "/user";
  const response = await axios.post<User>(fetchURL, {
    ...data,
  });
  return response.data;
};
