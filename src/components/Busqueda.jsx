import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";
import { GetProfesores, GetAlumnos, GetPersonas } from '../apis/Busqueda/GetBusqueda';

const Busqueda = ({ entity, placeholder }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleSearch = async () => {
        try {
            let resultados;

            switch (entity) {
                case 'profesores':
                    resultados = await GetProfesores(searchQuery);
                    break;
                case 'alumnos':
                    resultados = await GetAlumnos(searchQuery);
                    break;
                case 'personas':
                    resultados = await GetPersonas(searchQuery);
                    break;
                default:
                    console.error('Entidad no válida');
                    return;
            }

            setResultados(resultados);
        } catch (error) {
            console.error('Error al realizar la búsqueda', error);
        }
    };

    return (
        <div>
            <SearchContainer>
                <SearchInput
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={placeholder || 'Buscar...'}
                />
                <SearchButton onClick={handleSearch}>
                    <AiOutlineSearch />
                </SearchButton>
            </SearchContainer>
            <ResultsContainer>
                {resultados.map((resultado, index) => (
                    <ResultadoItem key={index}>
                        {JSON.stringify(resultado)}
                    </ResultadoItem>
                ))}
            </ResultsContainer>
        </div>
    );
};

export default Busqueda;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 20px;
`;

const SearchInput = styled.input`
    width: 100%;
    max-width: 300px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #23ADE0;
    }
`;

const SearchButton = styled.button`
    background-color: #a2d9a2;
    border: none;
    border-radius: 4px;
    padding: 10px;
    margin-left: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: #ffffff;
        font-size: 20px;
    }

    &:hover {
        background-color: #8ccf8c;
    }
`;

const ResultsContainer = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const ResultadoItem = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
`;
