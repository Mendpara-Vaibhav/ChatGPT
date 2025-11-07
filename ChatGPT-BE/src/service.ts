import type { TableData, Message, Session } from "./types.js";

const db = new Map<string, Session>();

const createDummyTable = (): TableData => {
  const products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"];
  const statuses = ["In Stock", "Out of Stock", "Low Stock"];

  return {
    headers: ["Product ID", "Name", "Status", "Price"],
    rows: Array.from({ length: 3 }, (_, i) => {
      const id = (1000 + i).toString();
      const name =
        products[Math.floor(Math.random() * products.length)] ?? products[0];
      const status =
        statuses[Math.floor(Math.random() * statuses.length)] ?? statuses[0];
      const price = `$${(Math.random() * 1000 + 100).toFixed(2)}`;

      return [id, name, status, price] as string[];
    }),
  };
};

export const generateBotResponse = (userMessage: string): Message => {
  return {
    id: `bot-${Date.now()}`,
    role: "bot",
    content: `Here is the information you requested about "${userMessage.substring(
      0,
      20
    )}...". Below is a summary of relevant data.`,
    tableData: createDummyTable(),
    timestamp: new Date().toISOString(),
  };
};

export const dbRepository = {
  createSession: (): Session => {
    const newId = `session-${Date.now()}`;
    const newSession: Session = {
      id: newId,
      title: "New Chat",
      messages: [],
    };
    db.set(newId, newSession);
    return newSession;
  },

  getSession: (id: string): Session | undefined => {
    return db.get(id);
  },

  getAllSessions: (): { id: string; title: string }[] => {
    return Array.from(db.values())
      .map(({ id, title }) => ({ id, title }))
      .reverse();
  },

  addMessageToSession: (
    sessionId: string,
    message: Message
  ): Session | undefined => {
    const session = db.get(sessionId);
    if (!session) {
      return undefined;
    }

    session.messages.push(message);

    if (session.messages.length === 1 && message.role === "user") {
      session.title =
        message.content.length > 30
          ? message.content.substring(0, 30) + "..."
          : message.content;
    }

    return session;
  },
};
