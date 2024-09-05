import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';

const Busqueda = ({ placeholder, data }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    useEffect(() => {
        if (data && data.length > 0) {
            setFilteredData(data.slice(0, 5));
        }
    }, [data]);

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (query) {
            const filtered = data.filter(item =>
                item.id.toString().includes(query) ||
                item.nombre.toLowerCase().includes(query.toLowerCase()) ||
                item.apellido.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredData(filtered.slice(0, 5));
            setIsDropdownVisible(true);
        } else {
            setFilteredData(data.slice(0, 5));
            setIsDropdownVisible(false);
        }
    };

    const handleBlur = () => {
        setTimeout(() => setIsDropdownVisible(false), 200);
    };

    return (
        <Wrapper>
            <SearchContainer>
                <SearchInput
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder={placeholder || 'Buscar...'}
                    onBlur={handleBlur}
                    onFocus={() => setIsDropdownVisible(true)}
                />
                <SearchButton onClick={() => handleSearch(searchQuery)}>
                    <AiOutlineSearch />
                </SearchButton>
                {isDropdownVisible && filteredData.length > 0 && (
                    <Dropdown>
                        {filteredData.map((item, index) => (
                            <DropdownItem key={index}>
                                {`${item.id} - ${item.nombre} ${item.apellido}`}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                )}
            </SearchContainer>
        </Wrapper>
    );
};

export default Busqueda;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 15vh;
    width: 100%;
`;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
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
`;

const Dropdown = styled.div`
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ccc;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }

    &:last-child {
        border-bottom: none;
    }
`;
