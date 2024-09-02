import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const GetProfesores = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/profesores/searchProfesor?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching profesores:", error);
        throw error;
    }
};

export const GetAlumnos = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/alumnos/searchAlumno?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching alumnos:", error);
        throw error;
    }
};

export const GetPersonas = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/personas/searchPersona?query=${query}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching personas:", error);
        throw error;
    }
};
