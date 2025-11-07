import { Router } from "express";
import { dbRepository, generateBotResponse } from "./service.js";
import type { Message } from "./types.js";

export const router = Router();

router.post("/chat/new", (req, res) => {
  try {
    const newSession = dbRepository.createSession();
    res.status(201).json({
      sessionId: newSession.id,
      title: newSession.title,
    });
  } catch (error) {
    console.error("Error creating new chat:", error);
    res.status(500).json({ message: "Error creating new chat" });
  }
});

router.post("/chat/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "Question is required" });
  }

  const session = dbRepository.getSession(sessionId);
  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  const userMessage: Message = {
    id: `user-${Date.now()}`,
    role: "user",
    content: question,
    timestamp: new Date().toISOString(),
  };
  dbRepository.addMessageToSession(sessionId, userMessage);

  const botResponse = generateBotResponse(question);
  dbRepository.addMessageToSession(sessionId, botResponse);

  res.status(201).json(botResponse);
});

router.get("/sessions", (req, res) => {
  try {
    const sessions = dbRepository.getAllSessions();
    res.status(200).json(sessions);
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({ message: "Error fetching sessions" });
  }
});

router.get("/sessions/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const session = dbRepository.getSession(sessionId);

  if (!session) {
    return res.status(404).json({ message: "Session not found" });
  }

  res.status(200).json(session.messages);
});
