import { useContext, createContext, useState } from "react";
import {
  getClientsRequest,
  getClientRequest,
  createClientRequest,
  updateClientRequest,
  deleteClientRequest,
} from "../api/client";

const ServiceContext = createContext();

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("UseService must be used within a ServiceProvider");
  }
  return context;
};

export function ServiceProvider({ children }) {
  const [client, setClient] = useState([]);

  const getClients = async () => {
    try {
      const res = await getClientsRequest();
      setClient(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ServiceContext.Provider value={{ client, getClients }}>
      {children}
    </ServiceContext.Provider>
  );
}
