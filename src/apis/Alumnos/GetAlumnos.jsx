import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const GetAlumnos = async () => {
    try {
        const response = await axios.get(`${API_URL}/alumnos/showAllAlumnos`);
        return response.data;
    } catch (error) {
        console.error("Error fetching alumnos:", error);
        throw error;
    }
};