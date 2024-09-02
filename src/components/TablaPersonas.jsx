import React, { useState } from 'react';
import styled from 'styled-components';
import Busqueda from './Busqueda'; // Asegúrate de que la ruta sea correcta

export const TablaPersonas = ({ personas, onEdit, onDelete }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const datosPorPagina = 4;

    const indiceUltimoDato = paginaActual * datosPorPagina;
    const indicePrimerDato = indiceUltimoDato - datosPorPagina;
    const datosActuales = personas
        .filter(persona => 
            persona.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
            persona.apellido.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(indicePrimerDato, indiceUltimoDato);

    const totalPaginas = Math.ceil(personas.length / datosPorPagina);

    const siguientePagina = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    return (
        <Fondo>
            <Header>
                <Titulo>LISTA DE PROFESIONALES</Titulo>
                <BusquedaContainer>
                    <Busqueda
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        placeholder="Buscar por nombre o apellido..."
                    />
                </BusquedaContainer>
            </Header>
            <Tabla>
                <thead>
                    <tr>
                        <Letra>ID</Letra>
                        <Letra>Nombre</Letra>
                        <Letra>Apellido</Letra>
                        <Letra>Carrera</Letra>
                        <Letra>Acciones</Letra>
                    </tr>
                </thead>
                <tbody>
                    {datosActuales.map(persona => (
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
            <Navegacion>
                {paginaActual > 1 && (
                    <FlechaIzquierda onClick={paginaAnterior}>←</FlechaIzquierda>
                )}
                <NumeroPagina>{paginaActual}</NumeroPagina>
                {paginaActual < totalPaginas && (
                    <FlechaDerecha onClick={siguientePagina}>→</FlechaDerecha>
                )}
            </Navegacion>
        </Fondo>
    );
};

export default TablaPersonas;

const Fondo = styled.div`
  box-sizing: border-box;
  background: linear-gradient(0deg, #80E7A2 0%, #158B7B 100%);
  width: 100%;
  height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Titulo = styled.h1`
  font-family: 'Lao Muang Don', sans-serif;
  color: #ffffff;
  font-size: 50px;
  font-weight: 400;
  margin: 10px; 
  text-align: center;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  @media (max-width: 480px) {
    font-size: 25px;
  }
`;

const BusquedaContainer = styled.div`
  width: 70%; 
  margin-bottom: 10px; 
`;

const Letra = styled.th`
  font-size: 25px;
  padding: 8px;
  text-align: center;
  background-color: #f4f4f4;
  border-bottom: 2px solid #ddd;
  
  @media (max-width: 768px) {
    font-size: 20px;
    padding: 6px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
    padding: 4px;
  }
`;

const Tabla = styled.table`
  background-color: rgba(255, 255, 255, 0.33);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  width: 70%;
  height: auto;
  border-spacing: 0;
  border-collapse: collapse; 
  
  @media (max-width: 1024px) {
    width: 90%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  td {
    text-align: center;
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

const Navegacion = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const FlechaIzquierda = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
  padding: 5px;
  &:hover {
    color: #23ADE0;
  }
`;

const FlechaDerecha = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  margin-left: 10px;
  padding: 5px;
  &:hover {
    color: #23ADE0;
  }
`;

const NumeroPagina = styled.div`
  color: #ffffff;
  font-size: 24px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
`;
