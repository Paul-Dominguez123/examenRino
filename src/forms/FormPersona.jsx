import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa'; // Importar ícono de carga

export const FormPersona = ({ personaInicial, onSubmit }) => {
    const [persona, setPersona] = useState({
        nombre: '',
        apellido: '',
        carrera: ''
    });

    const [alerta, setAlerta] = useState(null); // Estado para mostrar alertas
    const [cargando, setCargando] = useState(false); // Estado para mostrar carga

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlerta(null); // Limpiar alertas previas
        setCargando(true); // Mostrar indicador de carga

        // Verificar campos vacíos
        if (!persona.nombre || !persona.apellido || !persona.carrera) {
            setAlerta({
                tipo: 'error',
                mensaje: `Faltan campos: ${!persona.nombre ? 'Nombre' : ''}${!persona.nombre && !persona.apellido ? ', ' : ''}${!persona.apellido ? 'Apellido' : ''}${(!persona.nombre || !persona.apellido) && !persona.carrera ? ', ' : ''}${!persona.carrera ? 'Carrera' : ''}.`
            });
            setCargando(false); // Ocultar indicador de carga
            return;
        }

        let timeout;

        try {
            // Simular llamada a API
            timeout = setTimeout(() => {
                setAlerta({ tipo: 'error', mensaje: 'Ocurrió un problema al guardar, inténtelo de nuevo.' });
                setCargando(false); // Ocultar indicador de carga
            }, 7000);

            const respuesta = await onSubmit(persona);

            clearTimeout(timeout);

            if (respuesta.error) {
                setAlerta({ tipo: 'error', mensaje: respuesta.error });
            } else {
                setAlerta({ tipo: 'success', mensaje: 'Se guardaron los datos correctamente.' });
            }
        } catch (error) {
            clearTimeout(timeout);
            if (error.message.includes('Network Error')) {
                setAlerta({ tipo: 'error', mensaje: 'No hay conexión, inténtelo más tarde.' });
            } else {
                setAlerta({ tipo: 'error', mensaje: 'Ocurrió un problema al guardar, inténtelo de nuevo.' });
            }
        } finally {
            setCargando(false); // Ocultar indicador de carga
        }
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
            <Button type="submit" disabled={cargando}>
                {cargando ? <FaSpinner className="spinner" /> : 'Guardar'}
            </Button>
            {alerta && (
                <Alert tipo={alerta.tipo}>{alerta.mensaje}</Alert>
            )}
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
    gap: 10px;
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
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #1a8fd8;
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const Alert = styled.div`
    color: ${props => (props.tipo === 'error' ? '#f44336' : '#4caf50')};
    background-color: ${props => (props.tipo === 'error' ? '#fdd' : '#dff0d8')};
    border: 1px solid ${props => (props.tipo === 'error' ? '#f44336' : '#4caf50')};
    border-radius: 4px;
    padding: 10px;
    margin-top: 10px;
    text-align: center;
`;
