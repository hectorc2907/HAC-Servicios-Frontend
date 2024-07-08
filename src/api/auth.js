import axios from "axios";

const backend = import.meta.env.VITE_API_BACKEND;

export const login = async (data) => {
  try {
    const response = await axios.post(`${backend}/login`, data, {
      withCredentials: true,
    });
    console.log("Login Response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${backend}/logout`, null, {
      withCredentials: true,
    });
    console.log("Logout Response:", response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
