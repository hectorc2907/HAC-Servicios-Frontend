import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../api/auth";

export function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="flex justify-between px-10 py-5">
      <div>
        <Link to="/">HAC Servicios</Link>
      </div>
      {isAuthenticated ? (
        <div className="grid grid-cols-1">
          <button to="/logout" onClick={handleLogout} className="text-blue-600">
            Logout
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2">
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </div>
      )}
    </header>
  );
}
