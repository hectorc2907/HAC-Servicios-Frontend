import { useContext, createContext, useState } from "react";
import {
  getClientsRequest,
  getClientRequest,
  createClientRequest,
  updateClientRequest,
  deleteClientRequest,
} from "../api/client";
import {
  getTripRequest,
  getTripsRequest,
  createTripRequest,
  updateTripRequest,
  deleteTripRequest,
} from "../api/trip";
import {
  getSaleRequest,
  getSalesRequest,
  createSaleRequest,
  updateSaleRequest,
  deleteSaleRequest,
} from "../api/sale";

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
  const [trips, setTrips] = useState([]);
  const [sales, setSales] = useState([]);
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

  const getTrips = async () => {
    setLoading(true);
    try {
      const res = await getTripsRequest();
      setTrips(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTrip = async (id) => {
    try {
      const res = await getTripRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createTrip = async (trip) => {
    await createTripRequest(trip);
  };

  const updateTrip = async (id, client) => {
    try {
      await updateTripRequest(id, client);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrip = async (id) => {
    try {
      const res = await deleteTripRequest(id);
      if (res.status === 204) setTrips(trips);
    } catch (error) {
      console.error(error);
    }
  };

  const getSales = async () => {
    setLoading(true);
    try {
      const res = await getSalesRequest();
      setSales(res.data);
      console.log(res.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSale = async (id) => {
    try {
      const res = await getSaleRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createSale = async (trip) => {
    await createSaleRequest(trip);
  };

  const updateSale = async (id, sale) => {
    try {
      await updateSaleRequest(id, sale);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSale = async (id) => {
    try {
      const res = await deleteSaleRequest(id);
      if (res.status === 204) setSales(sales);
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
        trips,
        getTrips,
        getTrip,
        createTrip,
        updateTrip,
        deleteTrip,
        sales,
        getSales,
        getSale,
        createSale,
        updateSale,
        deleteSale,
        loading,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}
