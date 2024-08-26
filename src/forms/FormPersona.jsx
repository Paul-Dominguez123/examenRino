import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
        <FormContainer onSubmit={handleSubmit}>
            <FormTitle>{personaInicial ? 'Editar Persona' : 'Agregar Persona'}</FormTitle>
            <Input
                type="text"
                name="nombre"
                value={persona.nombre}
                onChange={handleChange}
                placeholder="Nombre"
            />
            <Input
                type="text"
                name="apellido"
                value={persona.apellido}
                onChange={handleChange}
                placeholder="Apellido"
            />
            <Input
                type="text"
                name="carrera"
                value={persona.carrera}
                onChange={handleChange}
                placeholder="Carrera"
            />
            <Button type="submit">Guardar</Button>
        </FormContainer>
    );
};

// Styled components
const FormContainer = styled.form`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px; /* Espacio entre elementos */
`;

const FormTitle = styled.h2`
    font-family: 'Lao Muang Don', sans-serif;
    color: #158B7B;
    font-size: 24px;
    margin: 0;
    text-align: center;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;

    &::placeholder {
        color: #888;
    }

    &:focus {
        border-color: #158B7B;
        outline: none;
    }
`;

const Button = styled.button`
    background-color: #23ADE0;
    color: #ffffff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #1a8fd8;
    }

    &:focus {
        outline: none;
    }
`;

