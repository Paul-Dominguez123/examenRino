import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const GetPersonas = async () => {
    try {
        const response = await axios.get(`https://xvp7p3cq-3000.use.devtunnels.ms/personas/showAllPersona`);
        return response.data;
    } catch (error) {
        console.error("Error fetching personas:", error);
        throw error;
    }
};
