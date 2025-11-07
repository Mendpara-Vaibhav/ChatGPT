import { createContext } from "react";
import type { SessionSummary } from "../types";

export interface SessionContextType {
  sessions: SessionSummary[];
  isLoading: boolean;
  fetchSessions: () => void;
  createNewSession: () => Promise<void>;
  refreshSessions: () => void;
}

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);
