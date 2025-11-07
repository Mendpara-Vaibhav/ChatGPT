export interface TableData {
  headers: string[];
  rows: string[][];
}

export interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  tableData?: TableData;
  timestamp: string;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
}
