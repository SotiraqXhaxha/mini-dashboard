import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import DetailsPage from './pages/DetailsPage';
import ProfilePage from './pages/ProfilePage';
import MainLayout from './components/MainLayout';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1d4ed8' },
    background: { default: '#f5f7fb' }
  }
});

function App() {
  const [user, setUser] = useState(null);

  // kur rifreskohet faqja, lexojmë user-in nga localStorage
  useEffect(() => {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />

        <Route
          path="/"
          element={
            user ? (
              <MainLayout onLogout={handleLogout}>
                <DashboardPage />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/details"
          element={
            user ? (
              <MainLayout onLogout={handleLogout}>
                <DetailsPage />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Profile – i kalojmë user-in si prop */}
        <Route
          path="/profile"
          element={
            user ? (
              <MainLayout onLogout={handleLogout}>
                <ProfilePage user={user} />
              </MainLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="*"
          element={<Navigate to={user ? '/' : '/login'} />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App; 
