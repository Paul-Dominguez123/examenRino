import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const DeletePersona = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/personas/deletePersona/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting persona:", error);
        throw error;
    }
};
