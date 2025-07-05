import axios from "axios";
import { API_URL } from "../config";
import type { ChatResponse, ChatReturn } from "../types/ChatResponse"; // { answer: string }

export async function getChatResponse(prompt: string): Promise<ChatReturn> {
  try {
    const response = await axios.post<ChatResponse>(
      `${API_URL}/api/chat`,
      { question: prompt }, // <-- data
      { headers: { "Content-Type": "application/json" } } // <-- config
    );
    const data = response.data;
    console.log("Chat response:", data);
    const result = data.result.replace("```json", "").replace("```", "");
    const chat: ChatReturn = JSON.parse(result);
    return chat;
  } catch (err) {
    console.error("Error fetching chat response:", err);
    throw new Error("Failed to fetch chat response");
  }
}
