import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import axios from 'axios';
import type { AuthState, AuthStatusResponse } from './types/auth';
import Home from './components/HomePage'
import LoginPage from './components/LoginPage';

axios.defaults.withCredentials = true
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() =>{
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get<AuthStatusResponse>(`${API_BASE_URL}/api/me`);

        if (response.data && response.data.isAuthenticated) {
          setAuthState({
            isAuthenticated: true,
            user: response.data.user || null,
            loading: false,
          });
        } else {
          setAuthState({ isAuthenticated: false, user: null, loading: false });
        }
      } catch (error) {
        console.error('認証状態の確認に失敗:', error);
        setAuthState({ isAuthenticated: false, user: null, loading: false });
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <Routes>
      <Route path='/' element={
        authState.isAuthenticated ? (
          <Navigate to="/home" replace />
        ) : (
          <Navigate to="/login" replace />
        )
      } />
      <Route path="/home" element={
        authState.isAuthenticated ? (
          <Home />
        ) : (
          <Navigate to="/login" replace />
        )} />
      <Route path="/login" element={
        authState.isAuthenticated ? (
          <Navigate to="/home" replace />
        ) : (
          <LoginPage />
        )} />
    </Routes>
  )
}

export default App
