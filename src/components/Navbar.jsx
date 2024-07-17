import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="bg-slate-100 px-10 flex justify-between py-5">
      <Link to={isAuthenticated ? "/admin" : "/"}>
        <h1 className="text-xl font-bold">
          {isAuthenticated ? user.username : "HAC Servicios"}
        </h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link>Viajes</Link>
            </li>
            <li>
              <Link to="/client">Clientes</Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
