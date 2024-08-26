import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const UpdatePersonas = async (id, persona) => {
    try {
        const response = await axios.put(`${API_URL}/personas/updatePersona/${id}`, persona);
        return response.data;
    } catch (error) {
        console.error("Error updating persona:", error);
        throw error;
    }
};
