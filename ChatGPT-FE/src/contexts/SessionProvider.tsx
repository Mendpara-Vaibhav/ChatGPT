import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { SessionSummary } from "../types";
import * as api from "../services/api";
import { SessionContext } from "./SessionContext";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getSessions();
      setSessions(data);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createNewSession = async () => {
    try {
      const { sessionId } = await api.startNewChat();
      await fetchSessions();
      navigate(`/chat/${sessionId}`);
    } catch (error) {
      console.error("Failed to create new session:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <SessionContext.Provider
      value={{
        sessions,
        isLoading,
        fetchSessions,
        createNewSession,
        refreshSessions: fetchSessions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
