import axios from "axios";

export const getClientsRequest = () => axios.get(`/client`);

export const getClientRequest = (id) => axios.get(`/client/${id}`);

export const createClientRequest = (client) => axios.post(`/client`, client);

export const updateClientRequest = (id, client) =>
  axios.put(`/client/${id}`, client);

export const deleteClientRequest = (id) => axios.delete(`/client/${id}`);
