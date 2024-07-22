import axios from "./axios";

export const getBillsRequest = () => axios.get(`/bills`);

export const getBillRequest = (id) => axios.get(`/bills/${id}`);

export const createBillRequest = (bill) => axios.post(`/bills`, bill);

export const updateBillRequest = (id, bill) => axios.put(`/bills/${id}`, bill);

export const deleteBillRequest = (id) => axios.delete(`/bills/${id}`);
