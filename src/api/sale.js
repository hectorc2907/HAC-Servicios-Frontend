import axios from "./axios";

export const getSalesRequest = () => axios.get(`/sale`);

export const getSaleRequest = (id) => axios.get(`/sale/${id}`);

export const createSaleRequest = (sale) => axios.post(`/sale`, sale);

export const updateSaleRequest = (id, sale) => axios.put(`/sale/${id}`, sale);

export const deleteSaleRequest = (id) => axios.delete(`/sale/${id}`);
