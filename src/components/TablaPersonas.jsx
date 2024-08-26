import React from 'react';
import styled from 'styled-components';

export const TablaPersonas = ({ personas, onEdit, onDelete }) => {
    return (
        <Fondo>
            <Titulo>LISTA DE PROFESIONALES</Titulo>
            <Tabla>
                <thead>
                    <Letra>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Carrera</th>
                        <th>Acciones</th>
                    </Letra>
                </thead>
                <tbody>
                    {personas.map(persona => (
                        <tr key={persona.id}>
                            <td>{persona.id}</td>
                            <td>{persona.nombre}</td>
                            <td>{persona.apellido}</td>
                            <td>{persona.carrera}</td>
                            <td>
                                <ButtonActualizar onClick={() => onEdit(persona)}>Actualizar</ButtonActualizar>
                                <ButtonEliminar onClick={() => onDelete(persona.id)}>Eliminar</ButtonEliminar>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Tabla>
        </Fondo>
    );
};

export default TablaPersonas;

const Fondo = styled.div`
box-sizing: border-box;
margin: 0;
  background: linear-gradient(0deg, #80E7A2 0%, #158B7B 100%);
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Titulo = styled.h1`
  font-family: 'Lao Muang Don', sans-serif;
  color: #ffffff;
  font-size: 50px;
  font-weight: 400;
  margin-bottom: 20px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const Tabla = styled.table`
  background-color: rgba(255, 255, 255, 0.33); 
  padding: 20px; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
  width: 100%;
  height: 60%;
  border-spacing: 0;

  @media (max-width: 1024px) {
    width: 90%;
    height: auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const Letra = styled.tr`
  font-size: 25px;

  th, td {
    padding: 2px 5px;
    margin: 0;
  }

  @media (max-width: 768px) {
    font-size: 20px;

    th, td {
      padding: 2px 3px;
    }
  }

  @media (max-width: 480px) {
    font-size: 18px;

    th, td {
      padding: 1px 2px;
    }
  }
`;

const ButtonActualizar = styled.button`
  background-color: #23ADE0; 
  color: white; 
  font-size: 20px; 
  border: none; 
  padding: 10px 15px; 
  margin-right: 5px; 
  border-radius: 4px; 
  cursor: pointer;
  
  &:hover {
    background-color: #1a8fd8; 
  }

  @media (max-width: 480px) {
    font-size: 18px;
    padding: 8px 12px;
  }
`;

const ButtonEliminar = styled.button`
  background-color: #e74c3c; 
  color: white; 
  font-size: 20px; 
  border: none; 
  padding: 10px 15px; 
  margin-left: 5px; 
  border-radius: 4px; 
  cursor: pointer; 
  
  &:hover {
    background-color: #c0392b; 
  }

  @media (max-width: 480px) {
    font-size: 18px;
    padding: 8px 12px;
  }
`;
