import React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from "react-icons/ai";

const Busqueda = ({ searchQuery, onSearchChange, placeholder }) => {
    return (
        <SearchContainer>
            <SearchInput
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholder || 'Buscar...'}
            />
            <SearchButton>
                <AiOutlineSearch />
            </SearchButton>
        </SearchContainer>
    );
};

export default Busqueda;

const SearchContainer = styled.div`
    display: flex;
    align-items: center; /* Center items vertically */
    margin: 20px;
`;

const SearchInput = styled.input`
    width: 100%;
    max-width: 300px; /* Adjusted for better fit */
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
    background-color: #a2d9a2; /* Light green color */
    border: none;
    border-radius: 4px;
    padding: 10px;
    margin-left: 10px; /* Space between input and button */
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: #ffffff;
        font-size: 20px;
    }

    &:hover {
        background-color: #8ccf8c; /* Slightly darker green on hover */
    }
`;
