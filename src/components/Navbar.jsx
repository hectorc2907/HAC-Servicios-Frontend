import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <nav className="bg-slate-100 px-10 py-5">
      <div className="max-w-[1024px] mx-auto flex justify-between items-center">
        <Link to={isAuthenticated ? "/admin" : "/"}>
          <h1 className="text-xl font-bold">
            {isAuthenticated ? user.username : "HAC Servicios"}
          </h1>
        </Link>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/trips">Viajes</Link>
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
      </div>
    </nav>
  );
}

export default Navbar;
