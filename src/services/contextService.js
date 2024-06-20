import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllContext = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/context`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch all context:", error);
    throw error;
  }
};

export const createContext = async (context) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/context`, context);
    return response.data;
  } catch (error) {
    console.error(`Failed to create context`, error);
    throw error;
  }
};

export const updateContext = async (id, context) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/context/${id}`, context);
    return response.data;
  } catch (error) {
    console.error(`Failed to update context with id: ${id}:`, error);
    throw error;
  }
};

export const deleteContext = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/context/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete context with id: ${id}:`, error);
    throw error;
  }
};
