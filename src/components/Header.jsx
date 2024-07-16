import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../api/auth";
import { useEffect } from "react";

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    // Función para verificar la autenticación al cargar el componente
    const checkAuthentication = () => {
      // Obtener el valor de la cookie "access_token"
      const token = getCookie("access_token");

      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication(); // Llamar a la función al cargar el componente
  }, []);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : "";
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <header className="flex justify-between items-center px-10 py-5">
      <div>
        <Link to="/">HAC Servicios</Link>
      </div>
      {isAuthenticated ? (
        <div className="grid grid-cols-1">
          <button onClick={handleLogout} className="text-blue-600">
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
