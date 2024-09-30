import React, { useEffect, useState } from 'react';
import { GetAlumnos } from '../apis/Alumnos/GetAlumnos';
import { GetProfesores } from '../apis/Profesores/GetProfesor'; 
import { PostAlumnos } from '../apis/Alumnos/PostAlumnos';
import { UpdateAlumnos } from '../apis/Alumnos/UpdateAlumnos';
import { DeleteAlumnos } from '../apis/Alumnos/DeleteAlumnos';
import { SearchAlumnos } from '../apis/Alumnos/SerchAlumnos';
import { TablaDatos } from '../components/Tabla';
import { FormAlumno } from '../forms/FormAlumno';
import styled from 'styled-components';
import { IoAddCircle } from 'react-icons/io5'; 
import Busqueda from '../components/Busqueda';

export const AlumnoPage = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [profesores, setProfesores] = useState([]); 
    const [filteredAlumnos, setFilteredAlumnos] = useState([]); 
    const [showModal, setShowModal] = useState(false);
    const [alumnoEditando, setAlumnoEditando] = useState(null);
    const titulos = ["id_alumno", "nombre", "apellido", "id_profesor"]; 


    useEffect(() => {
        cargarAlumnos();
        cargarProfesores();
    }, []);

    useEffect(() => {
        // Inicialmente, muestra todos los alumnos
        setFilteredAlumnos(alumnos); 
    }, [alumnos]);

    const cargarAlumnos = async () => {
        try {
            const data = await GetAlumnos();
            setAlumnos(data);
        } catch (error) {
            console.error("Error loading alumnos:", error);
        }
    };

    const cargarProfesores = async () => {
        try {
            const data = await GetProfesores();
            setProfesores(data);
        } catch (error) {
            console.error("Error loading profesores:", error);
        }
    };

    const handleAddAlumno = async (alumno) => {
        try {
            await PostAlumnos(alumno);
            setShowModal(false);
            cargarAlumnos();
        } catch (error) {
            console.error("Error adding alumno:", error);
        }
    };

    const handleUpdateAlumno = async (alumno) => {
        try {
            await UpdateAlumnos(alumnoEditando.id_alumno, alumno);
            setShowModal(false);
            setAlumnoEditando(null);
            cargarAlumnos();
        } catch (error) {
            console.error("Error updating alumno:", error);
        }
    };

    const handleDeleteAlumno = async (id_alumno) => {
        try {
            await DeleteAlumnos(id_alumno);
            cargarAlumnos();
        } catch (error) {
            console.error("Error deleting alumno:", error);
        }
    };

    const handleEditClick = (alumno) => {
        setAlumnoEditando(alumno);
        setShowModal(true);
    };

    const handleAddClick = () => {
        setAlumnoEditando(null);
        setShowModal(true);
    };
    const handleSearch = async (query) => {
        try {
            const data = await SearchAlumnos(query); 
            setFilteredAlumnos(data); 
        } catch (error) {
            console.error("Error searching alumnos:", error);
        }
    };

    return (
        <Container>
            <Header>
                <Titulo>LISTA DE ALUMNOS</Titulo>
                <Busqueda
                    entity="alumnos"
                    placeholder="Buscar alumnos..."
                    onSearch={(query) => handleSearch(query)}
                />
            </Header>
            <TablaDatos 
                titulos={titulos} 
                datos={filteredAlumnos}
                onEdit={handleEditClick} 
                onDelete={handleDeleteAlumno} 
                profesores={profesores} // Pasa los profesores aquí
            />
            {showModal && (
                <Modal>
                    <FormAlumno
                        alumnoInicial={alumnoEditando}
                        onSubmit={alumnoEditando ? handleUpdateAlumno : handleAddAlumno}
                        profesores={profesores}
                    />
                    <CloseButton onClick={() => setShowModal(false)}>Cerrar</CloseButton>
                </Modal>
            )}
            <AddButton onClick={handleAddClick}>
                <IoAddCircle size={50} /> {/* Usa el ícono en lugar del texto */}
            </AddButton>
        </Container>
    );
};

export default AlumnoPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const AddButton = styled.button`
  background-color: #20cc84; /* Color de fondo verde */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  position: fixed; 
  bottom: 20px; 
  right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #19debc; /* Color de fondo verde claro al pasar el cursor */
  }

  svg {
    font-size: 50px; // Ajusta el tamaño del ícono según sea necesario
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  background-color: #e74c3c;
  color: white;
  font-size: 16px;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px; 
  
  &:hover {
    background-color: #c0392b;
  }
`;

const Header = styled.div`
  width: 100%;
  position: fixed;
  margin: 0; 
  top: 90px;
`;

const Titulo = styled.h1`
  font-family: 'Lao Muang Don', sans-serif;
  color: #edf7f3;
  font-size: 48px;
  font-weight: 400;
  text-align: center;
  margin: 0; 
  
  @media (max-width: 768px) {
    font-size: 36px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
    margin-top: 15px; 
  }
`;
