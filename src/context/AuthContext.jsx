import { createContext, useContext, useEffect, useState } from "react";
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  verifyTokenRequest,
} from "../api/auth";
import Cookies from "js-cookie";
import { MoonLoader } from "react-spinners";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      await registerRequest(user);
      return { isOk: true };
    } catch (error) {
      setErrors(error.response.data);
      return { isOk: false };
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  const logout = async () => {
    await logoutRequest();
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await verifyTokenRequest();
        if (res.data) {
          setIsAuthenticated(true);
          setUser(res.data);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <MoonLoader color="#0d16fc" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, loading, user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
