// src/App.jsx
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './login/AuthContext'; // Importa AuthProvider
import Routes from './routes/Routes';
import MenuLayout from './menu/Menu';

const App = () => {
  return (
    <Div>
      <Router>
        <AuthProvider>
          <MenuLayout>
            <Routes />
          </MenuLayout>
        </AuthProvider>
      </Router>
    </Div>
  );
};

export default App;

const Div = styled.div`
  margin-top: 0px;
  margin: 0;
`;
