import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getAllContext = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/context`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch all context:', error);
        throw error;
    }
};