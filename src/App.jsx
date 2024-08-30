import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import Rutas from './routes/Routes'; 
import MenuLayout from './menu/Menu'; 

const App = () => {
  return (
    <Div>
    <Router>
      <MenuLayout>
        <Rutas /> {}
      </MenuLayout>
    </Router>
    </Div>
  );
};

export default App;

const Div=styled.div`
  margin-top: 0px;
  margin: 0;
 
`;