import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const PostAlumnos = async (alumno) => {
    try {
        const response = await axios.post(`${API_URL}/alumnos/newAlumno`, alumno);
        return response.data;
    } catch (error) {
        console.error("Error creating alumno:", error);
        throw error;
    }
};
