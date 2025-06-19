import { Link, useLocation } from "react-router";

interface NavigationProps {
  variant?: "purple" | "green" | "pink";
}

function Navigation({ variant = "purple" }: NavigationProps) {
  const location = useLocation();

  const getHoverColor = () => {
    switch (variant) {
      case "green":
        return "hover:text-green-300";
      case "pink":
        return "hover:text-pink-300";
      default:
        return "hover:text-purple-300";
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "font-bold" : "";
  };

  return (
    <nav className="relative z-10 p-6">
      <div className="flex justify-center space-x-6">
        <Link
          to="/home"
          className={`text-white ${getHoverColor()} transition-colors ${isActive(
            "/home"
          )}`}
        >
          🏠 Home
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
