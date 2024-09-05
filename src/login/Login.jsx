import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from './AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    setError(''); // Reset error message

    if (!username || !password) {
      setError('Por favor, rellene ambos campos.');
      return;
    }

    setLoading(true);

    try {
      // Simulación de autenticación, reemplazar con lógica real
      if (username === '123' && password === '123') {
        login(); // Llamada al contexto para manejar autenticación
        navigate('/personas'); // Redirigir al usuario
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Ocurrió un error al intentar iniciar sesión. Inténtelo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <LoginBox>
        <Title>Iniciar Sesión</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? 'Cargando...' : 'Ingresar'}
        </Button>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;

// Styled-components definitions
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 30px;
  font-family: 'Lao Muang Don', sans-serif;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #23ADE0;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #23ADE0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #1a8fd8;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 20px;
  font-size: 14px;
`;
