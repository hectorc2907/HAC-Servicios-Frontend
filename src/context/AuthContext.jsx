import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext();
  if (!context) {
    throw new Error("use Auth must be used within an AuthProvider");
  }
};
