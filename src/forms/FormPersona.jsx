import React, { useState, useEffect } from 'react';

export const FormPersona = ({ personaInicial, onSubmit }) => {
    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        carrera: ''
    });

    useEffect(() => {
        if (personaInicial) {
            setPersona(personaInicial);
        }
    }, [personaInicial]);

    const handleChange = (e) => {
        setPersona({
            ...persona,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(persona);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre"
                value={persona.nombre}
                onChange={handleChange}
                placeholder="Nombre"
            />
            <input
                type="text"
                name="apellido"
                value={persona.apellido}
                onChange={handleChange}
                placeholder="Apellido"
            />
            <input
                type="text"
                name="carrera"
                value={persona.carrera}
                onChange={handleChange}
                placeholder="Carrera"
            />
            <button type="submit">Guardar</button>
        </form>
    );
};

