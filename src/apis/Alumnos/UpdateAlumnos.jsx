import axios from 'axios';

const API_URL = 'https://xvp7p3cq-3000.use.devtunnels.ms';

export const UpdateAlumnos = async (id, alumno) => {
    try {
        const response = await axios.put(`${API_URL}/alumnos/updateAlumno/${id}`, alumno);
        return response.data;
    } catch (error) {
        console.error("Error updating alumno:", error);
        throw error;
    }
};
