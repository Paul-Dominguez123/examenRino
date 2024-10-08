import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiTwotoneContacts } from 'react-icons/ai';
import { ImUser, ImUserTie } from 'react-icons/im';
import { CgGirl } from 'react-icons/cg';
import styled from 'styled-components';
import { AuthContext } from '../login/AuthContext'; // Ajusta la ruta según tu estructura de archivos

const MenuLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';
  const { logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    // Elimina los datos de autenticación del almacenamiento local
    localStorage.removeItem('isAuthenticated'); 
    logout(); 
    navigate('/login');
  };
  

  return (
    <Wrapper>
      {!isLoginPage && ( 
        <MenuContainer $menuOpen={menuOpen}>
          <MenuButton onClick={toggleMenu}>
            &#9776;
          </MenuButton>
          {menuOpen && (
            <Menu>
              <MenuHeader>
                <AiTwotoneContacts size={30} />
                <span>Datos Escolares</span>
                <CloseButton onClick={closeMenu}>✖</CloseButton>
              </MenuHeader>
              <MenuItem onClick={closeMenu}>
                <Link to="/personas">
                  <ImUser size={20} />
                  Profesionales
                </Link>
              </MenuItem>
              <MenuItem onClick={closeMenu}>
                <Link to="/profesores">
                  <ImUserTie size={20} />
                  Profesores
                </Link>
              </MenuItem>
              <MenuItem onClick={closeMenu}>
                <Link to="/alumnos">
                  <CgGirl size={20} />
                  Alumnos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <span>Salir</span>
              </MenuItem>
            </Menu>
          )}
        </MenuContainer>
      )}
      <Content $menuOpen={menuOpen}>
        {children}
      </Content>
    </Wrapper>
  );
};

export default MenuLayout;

const Wrapper = styled.div``;

const MenuContainer = styled.div`
  width: ${({ $menuOpen }) => ($menuOpen ? '200px' : '0')}; 
  transition: width 0.3s ease;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  position: fixed; 
  top: 0;
  left: 0;
  height: 100vh; /* Asegura que el menú cubra toda la altura de la pantalla */
  z-index: 1000; /* Asegura que el menú esté por encima del contenido */
  @media (max-width: 880px) {
    width: ${({ $menuOpen }) => ($menuOpen ? '100px' : '0')}; 
    height: 50vh;
  }
`;

const MenuButton = styled.button`
  background-color: #23ADE0;
  color: white;
  font-size: 30px;
  border: none;
  display: flex;
  padding: 15px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin: 20px;
  position: fixed;
  &:hover {
    background-color: #1a8fd8;
  }
`;

const Menu = styled.div`
  background-color: #158B7B;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 200px;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  flex-direction: column;
    @media (max-width: 700px) {
    height: 40vh;
      top: 10vh;
      left: 10vh;
  }
  
`;

const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: #158B7B;
  color: white;
  font-size: 20px;
  font-weight: bold;

  svg {
    margin-right: 10px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #23ADE0;
  }
`;

const MenuItem = styled.div`
  color: white;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0d6655;
  }

  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 10px;
  }
`;

const Content = styled.div`
  flex: ${({ $menuOpen }) => ($menuOpen ? '0.7' : '1')};
  transition: flex 0.3s ease;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: ${({ $menuOpen }) => ($menuOpen ? '200px' : '0')};
  transition: margin-left 0.3s ease;
    @media (max-width: 700px) {
    margin-left: 0; /* Ajusta el margen para pantallas pequeñas */
  }
`;
