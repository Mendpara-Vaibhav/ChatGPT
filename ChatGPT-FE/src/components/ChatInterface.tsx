import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { FiSend, FiLoader } from "react-icons/fi";
import type { Message } from "../types";
import * as api from "../services/api";
import { ChatMessage } from "./ChatMessage";
import { useSessions } from "../hooks/useSessions";

export const ChatInterface = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { refreshSessions } = useSessions();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (sessionId) {
      setIsFetchingHistory(true);
      api
        .getSessionHistory(sessionId)
        .then((history) => {
          setMessages(history);
        })
        .catch((err) => console.error("Failed to fetch history:", err))
        .finally(() => setIsFetchingHistory(false));
    }
  }, [sessionId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const botResponse = await api.askQuestion(sessionId, userMessage.content);
      setMessages((prev) => [...prev, botResponse]);

      if (messages.length === 0) {
        refreshSessions();
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetchingHistory) {
    return (
      <div className="flex items-center justify-center h-full">
        <FiLoader className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex gap-4 p-4">
            <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-200 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              <FiLoader className="animate-spin" />
            </div>
            <div className="flex-1 w-0">
              <p className="font-bold">Bot</p>
              <p className="italic">Thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t dark:border-gray-800">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            disabled={isLoading}
            className="w-full p-3 pr-12 rounded-lg border bg-gray-100 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};
