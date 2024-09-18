import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const Busqueda = ({ placeholder, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    // Manejar el cambio en el input
    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Manejar la búsqueda cuando se haga clic en el botón de búsqueda
    const handleSearch = async () => {
        setLoading(true);
        try {
            // La función `onSearch` debe estar preparada para recibir `searchQuery`
            const filteredData = await onSearch(searchQuery);
            // Aquí puedes manejar el resultado filtrado si es necesario
        } catch (error) {
            console.error('Error during search:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <SearchContainer>
                <SearchInput
                    type="text"
                    value={searchQuery}
                    onChange={handleChange}
                    placeholder={placeholder || 'Buscar...'}
                />
               <SearchButton onClick={handleSearch} disabled={loading || !searchQuery.trim()}>
                {loading ? 'Buscando...' : <AiOutlineSearch />}
                </SearchButton>
            </SearchContainer>
        </Wrapper>
    );
};

export default Busqueda;

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 0px;
    margin-top: 20px;
    z-index: 10;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 400px;
    position: relative;
 
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 4px 0 0 4px;
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
    border-radius: 0 4px 4px 0;
    padding: 10px;
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

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;
