import React, { useEffect, useState } from 'react';
import { GetProfesores } from '../Apis/Profesores/GetProfesor';
import { PostProfesores } from '../Apis/Profesores/PostProfesor';
import { UpdateProfesores } from '../Apis/Profesores/UpdateProfesor';
import { DeleteProfesor } from '../Apis/Profesores/DeleteProfesor';
import { TablaProfesor } from '../components/TablaProfesor';
import { FormProfesor } from '../forms/FormProfesor';
import styled from 'styled-components';
import { IoAddCircle } from 'react-icons/io5'; // Importa el ícono

export const ProfesorPage = () => {
    const [profesores, setProfesores] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [profesorEditando, setProfesorEditando] = useState(null);

    useEffect(() => {
        cargarProfesores();
    }, []);

    const cargarProfesores = async () => {
        try {
            const data = await GetProfesores();
            setProfesores(data);
        } catch (error) {
            console.error("Error loading profesores:", error);
        }
    };

    const handleAddProfesor = async (profesor) => {
        try {
            await PostProfesores(profesor);
            setShowModal(false);
            cargarProfesores();
        } catch (error) {
            console.error("Error adding profesor:", error);
        }
    };

    const handleUpdateProfesor = async (profesor) => {
        try {
            await UpdateProfesores(profesorEditando.id_profesor, profesor);
            setShowModal(false);
            setProfesorEditando(null);
            cargarProfesores();
        } catch (error) {
            console.error("Error updating profesor:", error);
        }
    };

    const handleDeleteProfesor = async (id_profesor) => {
        try {
            await DeleteProfesor(id_profesor);
            cargarProfesores();
        } catch (error) {
            console.error("Error deleting profesor:", error);
        }
    };

    const handleEditClick = (profesor) => {
        setProfesorEditando(profesor);
        setShowModal(true);
    };

    const handleAddClick = () => {
        setProfesorEditando(null);
        setShowModal(true);
    };

    return (
        <Container>
            <TablaProfesor profesores={profesores} onEdit={handleEditClick} onDelete={handleDeleteProfesor} />
            {showModal && (
                <Modal>
                    <FormProfesor
                        profesorInicial={profesorEditando}
                        onSubmit={profesorEditando ? handleUpdateProfesor : handleAddProfesor}
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

export default ProfesorPage;

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
