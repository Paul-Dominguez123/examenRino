import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const SearchPersonas = async ( kuery ) => {
    try {
        const response = await axios.get(`${API_URL}/personas/searchPersona/${kuery}`);
        return response.data;
    } catch (error) {
        console.error("Error searching personas:", error);
        throw error;
    }
};
