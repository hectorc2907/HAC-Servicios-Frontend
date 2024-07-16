import { createContext, useContext, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("use Auth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
