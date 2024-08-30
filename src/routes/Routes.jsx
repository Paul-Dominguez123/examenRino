import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PersonasPage from '../page/PersonasPage'; 
import ProfesorPage from '../page/ProfesorPage';
import AlumnoPage from '../page/AlumnosPage'; 

const Rutas = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/personas" />} />
    <Route path="/personas" element={<PersonasPage />} />
    <Route path="/profesores" element={<ProfesorPage />} />
    <Route path="/alumnos" element={<AlumnoPage />} />
  </Routes>
);

export default Rutas;
