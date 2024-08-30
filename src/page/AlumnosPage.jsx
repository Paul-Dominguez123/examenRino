import React, { useEffect, useState } from 'react';
import { GetAlumnos } from '../Apis/Alumnos/GetAlumnos';
import { PostAlumnos } from '../Apis/Alumnos/PostAlumnos';
import { UpdateAlumnos } from '../Apis/Alumnos/UpdateAlumnos';
import { DeleteAlumnos } from '../Apis/Alumnos/DeleteAlumnos';
import { TablaAlumno } from '../components/TablaAlumnos';
import { FormAlumno } from '../forms/FormAlumno';
import styled from 'styled-components';
import { IoAddCircle } from 'react-icons/io5'; // Importa el ícono

export const AlumnoPage = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [alumnoEditando, setAlumnoEditando] = useState(null);

    useEffect(() => {
        cargarAlumnos();
    }, []);

    const cargarAlumnos = async () => {
        try {
            const data = await GetAlumnos();
            setAlumnos(data);
        } catch (error) {
            console.error("Error loading alumnos:", error);
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

    return (
        <Container>
            <TablaAlumno alumnos={alumnos} onEdit={handleEditClick} onDelete={handleDeleteAlumno} />
            {showModal && (
                <Modal>
                    <FormAlumno
                        alumnoInicial={alumnoEditando}
                        onSubmit={alumnoEditando ? handleUpdateAlumno : handleAddAlumno}
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
  background-color: #20cc84;
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
    background-color: #19debc;
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
  background-color: #21d98f;
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
