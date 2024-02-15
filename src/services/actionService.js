// src/services/actionService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Replace <URL> with your actual API base URL

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
        const response = await axios.post(`${API_BASE_URL}/action`, action);
        return response.data;
    } catch (error) {
        console.error('Failed to post action:', error);
        throw error;
    }
};
