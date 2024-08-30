import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const DeleteAlumnos = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/alumnos/deleteAlumnos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting alumno:", error);
        throw error;
    }
};
