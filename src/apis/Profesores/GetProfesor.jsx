import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const GetProfesores = async () => {
    try {
        const response = await axios.get(`${API_URL}/profesores/showAllProfesor`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profesores:", error);
        throw error;
    }
};