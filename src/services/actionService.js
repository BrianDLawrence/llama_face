import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getActions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actions`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch actions:", error);
    throw error;
  }
};

export const postAction = async (action) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/actions`, action);
    return response.data;
  } catch (error) {
    console.error("Failed to post action:", error);
    throw error;
  }
};

export const putAction = async (id, action) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/actions/${id}`, action);
    return response.data;
  } catch (error) {
    console.error(`Failed to modify action with id ${id}:`, error);
    throw error;
  }
};

export const deleteAction = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/actions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete action with id ${id}:`, error);
    throw error;
  }
};

export const sendAction = async (id) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/send/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to send action with id ${id}:`, error);
    throw error;
  }
};

export const getAmountUnansweredMessages = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/get_amount_unanswered_messages`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch amount of unanswered messages:", error);
    throw error;
  }
};

export const associateContextWithAction = async (actionId, contextId) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/addcontextaction/${actionId}`,
      { contextid: contextId }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to associate context with action id ${actionId}:`,
      error
    );
    throw error;
  }
};
