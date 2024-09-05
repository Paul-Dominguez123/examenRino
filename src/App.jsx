import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './login/AuthContext'; 
import Routes from './routes/Routes';
import MenuLayout from './components/Menu';

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

const Div = styled.div``;
