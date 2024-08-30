import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const UpdateProfesores = async (id, profesor) => {
    try {
        const response = await axios.put(`${API_URL}/profesores/updateProfesor/${id}`, profesor);
        return response.data;
    } catch (error) {
        console.error("Error updating profesor:", error);
        throw error;
    }
};
