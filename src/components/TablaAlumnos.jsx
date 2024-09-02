import React, { useState } from 'react';
import styled from 'styled-components';
import Busqueda from './Busqueda'; // Asegúrate de que la ruta sea correcta

export const TablaAlumno = ({ alumnos, profesores, onEdit, onDelete }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const datosPorPagina = 4;
  const [searchQuery, setSearchQuery] = useState('');

  const indiceUltimoDato = paginaActual * datosPorPagina;
  const indicePrimerDato = indiceUltimoDato - datosPorPagina;
  const datosActuales = alumnos
    .filter(alumno => alumno.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || alumno.apellido.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(indicePrimerDato, indiceUltimoDato);

  const totalPaginas = Math.ceil(alumnos.length / datosPorPagina);

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

  const obtenerNombreProfesor = (id_profesor) => {
    try {
      if (!profesores) return 'Desconocido';
      const profesor = profesores.find(prof => prof.id_profesor === id_profesor);
      return profesor ? `${profesor.nombre} ${profesor.apellido}` : 'Desconocido';
    } catch (error) {
      console.error('Error al obtener el nombre del profesor:', error);
      return 'Desconocido';
    }
  };

  return (
    <Fondo>
      <Header>
        <Titulo>LISTA DE ALUMNOS</Titulo>
        <BusquedaContainer>
          <Busqueda
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            placeholder="Buscar por Datos"
          />
        </BusquedaContainer>
      </Header>
      <Tabla>
        <thead>
          <tr>
            <Letra>ID</Letra>
            <Letra>Nombre</Letra>
            <Letra>Apellido</Letra>
            <Letra>Profesor</Letra>
            <Letra>Acciones</Letra>
          </tr>
        </thead>
        <tbody>
          {datosActuales.map(alumno => (
            <tr key={alumno.id_alumno}>
              <td>{alumno.id_alumno}</td>
              <td>{alumno.nombre}</td>
              <td>{alumno.apellido}</td>
              <td>{obtenerNombreProfesor(alumno.id_profesor)}</td>
              <td>
                <ButtonActualizar onClick={() => onEdit(alumno)}>Actualizar</ButtonActualizar>
                <ButtonEliminar onClick={() => onDelete(alumno.id_alumno)}>Eliminar</ButtonEliminar>
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

export default TablaAlumno;

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
  margin-bottom: 20px; /* Espacio debajo del header para la tabla */
`;

const Titulo = styled.h1`
  font-family: 'Lao Muang Don', sans-serif;
  color: #ffffff;
  font-size: 50px;
  font-weight: 400;
  margin: 20px 0; /* Ajusta el margen superior e inferior para mover el título hacia arriba */
  text-align: center;

  @media (max-width: 768px) {
    font-size: 40px;
  }

  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

const BusquedaContainer = styled.div`
  width: 70%;
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
    padding: 10px;
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
