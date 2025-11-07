import { useState } from "react";
import { FiThumbsUp, FiThumbsDown, FiUser, FiCpu } from "react-icons/fi";
import type { Message } from "../types";
import { TableView } from "./TableView";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);

  const isBot = message.role === "bot";

  return (
    <div
      className={`flex gap-4 p-4 rounded-lg ${
        isBot
          ? "bg-gray-50 dark:bg-gray-800"
          : "bg-transparent dark:bg-transparent"
      }`}
    >
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot
            ? "bg-blue-200 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
            : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        }`}
      >
        {isBot ? <FiCpu /> : <FiUser />}
      </div>
      <div className="flex-1 w-0">
        <p className="font-bold">{isBot ? "Bot" : "You"}</p>
        <div className="prose dark:prose-invert max-w-none">
          <p>{message.content}</p>
          {message.tableData && <TableView data={message.tableData} />}
        </div>
        {isBot && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setFeedback("like")}
              className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                feedback === "like"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500"
              }`}
            >
              <FiThumbsUp />
            </button>
            <button
              onClick={() => setFeedback("dislike")}
              className={`p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
                feedback === "dislike"
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500"
              }`}
            >
              <FiThumbsDown />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
