import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonasPage from '../page/PersonasPage'; 
import ProfesorPage from '../page/ProfesorPage';
import AlumnoPage from '../page/AlumnosPage';
import LoginPage from '../login/Login';
import {AuthContext} from '../login/AuthContext'; 
const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const Rutas = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/personas" /> : <Navigate to="/login" />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/personas" element={<PrivateRoute element={<PersonasPage />} />} />
      <Route path="/profesores" element={<PrivateRoute element={<ProfesorPage />} />} />
      <Route path="/alumnos" element={<PrivateRoute element={<AlumnoPage />} />} />
    </Routes>
  );
};

export default Rutas;
