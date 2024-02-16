// src/services/actionService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getActions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/actions`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch actions:', error);
        throw error;
    }
};

export const postAction = async (action) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/actions`, action);
        return response.data;
    } catch (error) {
        console.error('Failed to post action:', error);
        throw error;
    }
};

// Modify an existing action
export const putAction = async (id, action) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/actions/${id}`, action);
        return response.data;
    } catch (error) {
        console.error(`Failed to modify action with id ${id}:`, error);
        throw error;
    }
};

// Remove an action
export const deleteAction = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/actions/${id}`);
        return response.data; // This might not always return data; depends on API implementation.
    } catch (error) {
        console.error(`Failed to delete action with id ${id}:`, error);
        throw error;
    }
};

// Send Action -> Invoke the Llama Herder
export const sendAction = async (id) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/send/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to send action with id ${id}:`, error);
        throw error;
    }
};
