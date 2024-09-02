import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const GetAlumnos = async () => {
    try {
        const response = await axios.get(`${API_URL}/alumnos/showAllAlumno`);
        return response.data;
    } catch (error) {
        console.error("Error fetching alumnos:", error);
        throw error;
    }
};