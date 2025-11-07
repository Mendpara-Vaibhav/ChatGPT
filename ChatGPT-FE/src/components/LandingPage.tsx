import { FiMessageSquare } from "react-icons/fi";
import { useSessions } from "../hooks/useSessions";

export const LandingPage = () => {
  const { createNewSession } = useSessions();

  return (
    <div className="flex flex-col items-center justify-center h-full text-gray-600 dark:text-gray-400">
      <FiMessageSquare size={64} className="mb-4" />
      <h1 className="text-2xl font-semibold mb-2">Welcome to ChatGPT</h1>
      <p className="mb-4">Select a chat from the sidebar or start a new one.</p>
      <button
        onClick={createNewSession}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start New Chat
      </button>
    </div>
  );
};
