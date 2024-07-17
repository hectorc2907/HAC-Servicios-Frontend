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
  const [loading, setLoading] = useState(false);

  const getClients = async () => {
    setLoading(true);
    try {
      const res = await getClientsRequest();
      setClients(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getClient = async (id) => {
    try {
      const res = await getClientRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createClient = async (client) => {
    await createClientRequest(client);
  };

  const updateClient = async (id, client) => {
    try {
      await updateClientRequest(id, client);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteClient = async (id) => {
    try {
      const res = await deleteClientRequest(id);
      if (res.status === 204) setClients(clients);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        clients,
        getClients,
        getClient,
        createClient,
        updateClient,
        deleteClient,
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
