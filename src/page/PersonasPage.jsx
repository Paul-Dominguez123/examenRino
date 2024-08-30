import React, { useEffect, useState } from 'react';
import { GetPersonas } from '../Apis/Personas/GetPersonas';
import { PostPersonas } from '../Apis/Personas/PostPersonas';
import { UpdatePersonas } from '../Apis/Personas/UpdatePersonas';
import { DeletePersona } from '../apis/Personas/DeletePersona';
import { TablaPersonas } from '../components/TablaPersonas';
import { FormPersona } from '../forms/FormPersona';
import styled from 'styled-components';
import { IoAddCircle } from 'react-icons/io5'; // Importa el ícono

export const PersonasPage = () => {
    const [personas, setPersonas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [personaEditando, setPersonaEditando] = useState(null);

    useEffect(() => {
        cargarPersonas();
    }, []);

    const cargarPersonas = async () => {
        try {
            const data = await GetPersonas();
            setPersonas(data);
        } catch (error) {
            console.error("Error loading personas:", error);
        }
    };

    const handleAddPersona = async (persona) => {
        try {
            await PostPersonas(persona);
            setShowModal(false);
            cargarPersonas();
        } catch (error) {
            console.error("Error adding persona:", error);
        }
    };

    const handleUpdatePersona = async (persona) => {
        try {
            await UpdatePersonas(personaEditando.id, persona);
            setShowModal(false);
            setPersonaEditando(null);
            cargarPersonas();
        } catch (error) {
            console.error("Error updating persona:", error);
        }
    };

    const handleDeletePersona = async (id) => {
        try {
            await DeletePersona(id);
            cargarPersonas();
        } catch (error) {
            console.error("Error deleting persona:", error);
        }
    };

    const handleEditClick = (persona) => {
        setPersonaEditando(persona);
        setShowModal(true);
    };

    const handleAddClick = () => {
        setPersonaEditando(null);
        setShowModal(true);
    };

    return (
        <Container>
            <TablaPersonas personas={personas} onEdit={handleEditClick} onDelete={handleDeletePersona} />
            {showModal && (
                <Modal>
                    <FormPersona
                        personaInicial={personaEditando}
                        onSubmit={personaEditando ? handleUpdatePersona : handleAddPersona}
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

export default PersonasPage;

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
