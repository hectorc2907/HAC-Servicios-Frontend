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
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    try {
      const res = await getClientsRequest();
      setClients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createClient = async (client) => {
    await createClientRequest(client);
  };

  return (
    <ServiceContext.Provider value={{ clients, getClients, createClient }}>
      {children}
    </ServiceContext.Provider>
  );
}
