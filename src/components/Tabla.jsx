import React, { useState } from 'react';
import styled from 'styled-components';

export const TablaDatos = ({ titulos = [], datos = [], onEdit, onDelete }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const datosPorPagina = 4;

  const indiceUltimoDato = paginaActual * datosPorPagina;
  const indicePrimerDato = indiceUltimoDato - datosPorPagina;
  const datosActuales = datos.slice(indicePrimerDato, indiceUltimoDato);

  const totalPaginas = Math.ceil(datos.length / datosPorPagina);

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
          {datosActuales.map(dato => (
            <tr key={dato.id}>
              {titulos.map((titulo, index) => (
                <td key={index}>{dato[titulo]}</td>
              ))}
              <td>
                <ButtonActualizar onClick={() => onEdit(dato)}>Actualizar</ButtonActualizar>
                <ButtonEliminar onClick={() => onDelete(dato.id)}>Eliminar</ButtonEliminar>
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

export default TablaDatos;

const Fondo = styled.div`
  box-sizing: border-box;
  background: linear-gradient(0deg, #80E7A2 0%, #158B7B 100%);
  width: 100vw; /* Asegúrate de que el fondo cubra toda la vista */
  height: 100vh; /* Asegúrate de que el fondo cubra toda la altura de la vista */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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

const Letra = styled.th`
  font-size: 25px;
  padding: 12px 30px;
  text-align: center;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 10px 14px;
  }

  @media (max-width: 480px) {
    font-size: 17px;
    padding: 8px 5px;
  }
`;
