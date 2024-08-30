import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const PostProfesores = async (profesor) => {
    try {
        const response = await axios.post(`${API_URL}/profesores/newProfesor`, profesor);
        return response.data;
    } catch (error) {
        console.error("Error creating profesor:", error);
        throw error;
    }
};

