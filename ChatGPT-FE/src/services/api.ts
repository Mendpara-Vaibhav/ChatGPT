import axios from "axios";
import type { Message, SessionSummary } from "../types";

const API_BASE_URL = "http://localhost:8888/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const startNewChat = async (): Promise<{
  sessionId: string;
  title: string;
}> => {
  const response = await api.post("/chat/new");
  return response.data;
};

export const getSessions = async (): Promise<SessionSummary[]> => {
  const response = await api.get("/sessions");
  return response.data;
};

export const getSessionHistory = async (
  sessionId: string
): Promise<Message[]> => {
  const response = await api.get(`/sessions/${sessionId}`);
  return response.data;
};

export const askQuestion = async (
  sessionId: string,
  question: string
): Promise<Message> => {
  const response = await api.post(`/chat/${sessionId}`, { question });
  return response.data;
};
