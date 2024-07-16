import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user } = useAuth();
  return <nav>Navbar</nav>;
}

export default Navbar;
