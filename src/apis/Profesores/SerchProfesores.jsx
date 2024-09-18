import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const SearchProfesores = async ( kuery ) => {
    try {
        const response = await axios.get(`${API_URL}/profesores/searchProfesore/${kuery}`);
        return response.data;
    } catch (error) {
        console.error("Error searching profesores:", error);
        throw error;
    }
};
