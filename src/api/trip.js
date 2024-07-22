import axios from "./axios";

export const getTripsRequest = () => axios.get(`/trips`);

export const getTripRequest = (id) => axios.get(`/trips/${id}`);

export const createTripRequest = (trip) => axios.post(`/trips`, trip);

export const updateTripRequest = (id, trip) => axios.put(`/trips/${id}`, trip);

export const deleteTripRequest = (id) => axios.delete(`/trips/${id}`);
