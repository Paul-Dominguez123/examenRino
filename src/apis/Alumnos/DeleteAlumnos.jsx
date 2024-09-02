import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const DeleteAlumnos = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/alumnos/deleteAlumno/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting alumno:", error);
        throw error;
    }
};
