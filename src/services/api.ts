// src/services/api.ts
import axios from "axios";
import { Event } from "../types/Event";
import { API_URL } from "../config"

export const fetchEvents = async (): Promise<Event[]> => {
  const fetchURL = API_URL + "/events";
  const response = await axios.get<Event[]>(fetchURL);
  return response.data;
};
