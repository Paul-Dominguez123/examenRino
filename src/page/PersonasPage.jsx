import React, { useEffect, useState } from 'react'
import { GetPersonas } from '../Apis/GetPersonas';
import { PostPersonas } from '../Apis/PostPersonas';
import { UpdatePersonas } from '../Apis/UpdatePersonas';
import { TablaPersonas } from '../components/TablaPersonas';
import { FormPersona } from '../forms/FormPersona';
import { DeletePersona } from '../apis/DeletePersona';

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
    <div>
        <button onClick={handleAddClick}>Añadir Persona</button>
            <TablaPersonas personas={personas} onEdit={handleEditClick} onDelete={handleDeletePersona} />
            {showModal && (
                <div className="modal">
                    <FormPersona
                        personaInicial={personaEditando}
                        onSubmit={personaEditando ? handleUpdatePersona : handleAddPersona}
                    />
                    <button onClick={() => setShowModal(false)}>Cerrar</button>
                </div>
            )}
    </div>
  )
}
