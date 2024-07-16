import { createContext, useContext } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext();
  if (!context) {
    throw new Error("use Auth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <AuthContext.Provider value={{ signup }}>{children}</AuthContext.Provider>
  );
};
