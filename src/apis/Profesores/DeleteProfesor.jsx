import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const DeleteProfesor = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/profesores/deleteProfesor/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting profesor:", error);
        throw error;
    }
};
