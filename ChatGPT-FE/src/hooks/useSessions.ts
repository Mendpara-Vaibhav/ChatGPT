import { useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import type { SessionContextType } from "../contexts/SessionContext";

export const useSessions = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessions must be used within a SessionProvider");
  }
  return context;
};
