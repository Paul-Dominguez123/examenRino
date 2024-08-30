import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const UpdatePersonas = async (id, persona) => {
    try {
        const response = await axios.put(`${API_URL}/personas/updatePersona/${id}`, persona);
        return response.data;
    } catch (error) {
        console.error("Error updating persona:", error);
        throw error;
    }
};
