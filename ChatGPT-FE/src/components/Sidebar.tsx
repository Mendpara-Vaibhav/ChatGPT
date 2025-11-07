import { FiPlus, FiMessageSquare, FiUser, FiLogOut, FiX } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { useSessions } from "../hooks/useSessions";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const { sessions, isLoading, createNewSession } = useSessions();
  const { sessionId } = useParams();

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggle}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 flex flex-col w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform transform md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 h-16 border-b dark:border-gray-800">
          <Link to="/" className="font-bold text-lg">
            ChatGPT
          </Link>
          <button onClick={onToggle} className="md:hidden p-1 text-gray-500">
            <FiX />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={createNewSession}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus /> New Chat
          </button>
        </div>

        {/* Session List */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1">
          {isLoading && <p className="text-gray-400 p-2">Loading...</p>}
          {!isLoading &&
            sessions.map((session) => (
              <Link
                key={session.id}
                to={`/chat/${session.id}`}
                onClick={onToggle}
                className={`flex items-center gap-2 p-2 rounded-lg truncate ${
                  sessionId === session.id
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <FiMessageSquare className="shrink-0" />
                <span className="truncate">{session.title}</span>
              </Link>
            ))}
        </nav>

        <div className="p-4 border-t dark:border-gray-800">
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer">
            <FiUser />
            <span>User Name</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer text-red-500 dark:text-red-400">
            <FiLogOut />
            <span>Log Out</span>
          </div>
        </div>
      </div>
    </>
  );
};
