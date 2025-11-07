import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="shrink-0 h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 flex items-center justify-between px-4">
      <button onClick={onToggleSidebar} className="p-1 text-gray-500 md:hidden">
        <FiMenu size={20} />
      </button>

      <div className="hidden md:block"></div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
      </button>
    </header>
  );
};
