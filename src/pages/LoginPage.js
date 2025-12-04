
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.trim()) return;

    // Ndertojme user-in aktual: emrin e marrim nga pjesa para @
    const derivedName = form.email.split('@')[0];
    const userData = {
      name: derivedName,
      email: form.email
    };

    // Lexojme user-at ekzistues nga localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Nese ky email nuk ekziston, e shtojme si user te ri
    const exists = storedUsers.some((u) => u.email === userData.email);
    if (!exists) {
      storedUsers.push({
        ...userData,
        role: 'User',
        phone: '',
        location: '',
        bio: ''
      });
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }

    // Ruajme user-in aktual (currentUser) per App dhe ProfilePage
    onLogin(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    // TANI shkojme ne DASHBOARD, jo ne /profile
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg,#1d4ed8,#22c55e)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            borderRadius: 4,
            backdropFilter: 'blur(10px)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 56,
                height: 56,
                margin: '0 auto',
                mb: 1
              }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" fontWeight="bold">
              Benvenuto
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Inserisci il tuo email per accedere e creare il profilo.
            </Typography>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'grid', gap: 2 }}
          >
            <TextField
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={handleChange('email')}
              fullWidth
            />
            <TextField
              label="Password (fake)"
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              fullWidth
            />
            <Button type="submit" variant="contained" size="large">
              Entra
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}