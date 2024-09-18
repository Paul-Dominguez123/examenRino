import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const SearchAlumnos = async ({ kuery }) => {
    try {
        const response = await axios.get(`${API_URL}/alumnos/searchAlumno/${kuery}`);
        return response.data;
    } catch (error) {
        console.error("Error searching alumno:", error);
        throw error;
    }
};
