import React, { useState } from 'react';
import styled from 'styled-components';
import { IoAddCircle } from 'react-icons/io5';
import { ImBin } from 'react-icons/im';

export const TablaDatos = ({ titulos = [], datos = [], onEdit, onDelete, profesores }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const datosPorPagina = 4;

    // Función para obtener el nombre del profesor basado en su id
    const obtenerNombreProfesor = (id_profesor) => {
        const profesor = profesores.find(p => p.id_profesor === id_profesor);
        return profesor ? profesor.nombre : 'Desconocido';
    };

    // Cálculo de índices para la paginación
    const indiceUltimoDato = paginaActual * datosPorPagina;
    const indicePrimerDato = indiceUltimoDato - datosPorPagina;
    const datosActuales = datos.slice(indicePrimerDato, indiceUltimoDato);

    // Número total de páginas
    const totalPaginas = Math.ceil(datos.length / datosPorPagina);

    // Funciones para navegar entre páginas
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
            <ContenedorTabla>
                <Tabla>
                    <thead>
                        <tr>
                            {titulos.map((titulo, index) => (
                                <Letra key={index}>{titulo}</Letra>
                            ))}
                            <Letra>Acciones</Letra>
                        </tr>
                    </thead>
                    <tbody>
                        {datosActuales.map((dato, index) => (
                            <tr key={index}>
                                {titulos.map((titulo, index) => (
                                    <Celda key={index}>
                                        {titulo === 'id_profesor' ? obtenerNombreProfesor(dato[titulo]) : dato[titulo]}
                                    </Celda>
                                ))}
                                <Celda>
                                    <ButtonActualizar onClick={() => onEdit(dato)}>
                                        <IoAddCircle />
                                    </ButtonActualizar>
                                    <ButtonEliminar onClick={() => onDelete(dato.id_alumno)}>
                                        <ImBin />
                                    </ButtonEliminar>
                                </Celda>
                            </tr>
                        ))}
                    </tbody>
                </Tabla>
            </ContenedorTabla>
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

export default TablaDatos;

const Fondo = styled.div`
  box-sizing: border-box;
  background: linear-gradient(0deg, #80E7A2 0%, #158B7B 100%);
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

const ContenedorTabla = styled.div`
  width: 98%;
  max-width: 1200px;
  max-height: 500px; 
  overflow-y: auto; 
  background-color: rgba(255, 255, 255, 0.33);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  margin-top: 200px;
  margin-bottom: 50px; 

  @media (max-width: 968px) {
    margin-top: 100px; 
    margin-bottom: 30px; 
    max-width: 98%;
    overflow-y: scroll;
  }

  @media (max-width: 480px) {
    margin-top: 10px;
  }
`;

const Tabla = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;
`;

const Celda = styled.td`
  font-size: 22px;
  padding: 12px 30px;
  text-align: center;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 15px;
    padding: 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    padding: 8px 10px;
  }
`;

const Letra = styled.th`
  font-size: 30px;
  padding: 12px 30px;
  text-align: center;
  color: #ffffff;

  @media (max-width: 1007px) {
    font-size: 28px;
    padding: 13px 20px;
  }

  @media (max-width: 867px) {
    font-size: 23px;
    padding: 13px 20px;
  }

  @media (max-width: 768px) {
    font-size: 22px;
    padding: 10px 14px;
  }

  @media (max-width: 540px) {
    font-size: 14px;
    padding: 8px 5px;
  }
  @media (max-width: 275px) {
    font-size: 10px;
    padding: 8px 5px;
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
  margin-top: 10px;
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

  @media (max-width: 480px) {
    font-size: 20px;
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

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const NumeroPagina = styled.div`
  color: #ffffff;
  font-size: 24px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;
