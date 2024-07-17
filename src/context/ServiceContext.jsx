import { useContext, createContext } from "react";

const ServiceContext = createContext();

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("UseService must be used within a ServiceProvider");
  }
  return context;
};

export function ServiceProvider({ children }) {
  return (
    <ServiceContext.Provider value={{}}>{children}</ServiceContext.Provider>
  );
}
