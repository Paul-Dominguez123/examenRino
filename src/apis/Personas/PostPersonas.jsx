import axios from 'axios';


const API_URL = 'http://localhost:3000';

export const PostPersonas = async (persona) => {
    try {
        const response = await axios.post(`https://xvp7p3cq-3000.use.devtunnels.ms/personas/newPersona`, persona);
        return response.data;
    } catch (error) {
        console.error("Error creating persona:", error);
        throw error;
    }
};
