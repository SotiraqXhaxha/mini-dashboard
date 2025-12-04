import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography
} from '@mui/material';

export default function ProfilePage({ user }) {
  const [profile, setProfile] = useState(null);

  // kur hapet faqa e profilit, gjejmë user-in në listën e users sipas email-it
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const found =
      storedUsers.find((u) => u.email === user.email) || {
        name: user.name,
        email: user.email,
        role: 'User',
        phone: '',
        location: '',
        bio: ''
      };
    setProfile(found);
  }, [user]);

  const handleChange = (field) => (e) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleSave = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const index = storedUsers.findIndex((u) => u.email === profile.email);

    if (index >= 0) {
      storedUsers[index] = profile;
    } else {
      storedUsers.push(profile);
    }
    localStorage.setItem('users', JSON.stringify(storedUsers));

    alert('Profilo salvato (fake)!');
  };

  if (!profile) return null;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profilo Utente
      </Typography>

      <Grid container spacing={3}>
        {/* Kolona majtas: info bazë */}
        <Grid item xs={12} md={4}>
          <Card elevation={4} sx={{ borderRadius: 4 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 96,
                  height: 96,
                  margin: '0 auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: 36
                }}
              >
                {profile.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h6">{profile.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.role}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ textAlign: 'left', fontSize: 14 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {profile.email}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Phone
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {profile.phone || '-'}
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  Location
                </Typography>
                <Typography variant="body2">
                  {profile.location || '-'}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Kolona djathtas: formë editimi */}
        <Grid item xs={12} md={8}>
          <Card elevation={4} sx={{ borderRadius: 4, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Modifica Profilo
              </Typography>

              <Box
                component="form"
                sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}
                onSubmit={(e) => e.preventDefault()}
              >
                <TextField
                  label="Nome"
                  value={profile.name}
                  onChange={handleChange('name')}
                  fullWidth
                />
                <TextField
                  label="Ruolo"
                  value={profile.role}
                  onChange={handleChange('role')}
                  fullWidth
                />
                <TextField
                  label="Telefono"
                  value={profile.phone}
                  onChange={handleChange('phone')}
                  fullWidth
                />
                <TextField
                  label="Location"
                  value={profile.location}
                  onChange={handleChange('location')}
                  fullWidth
                />
              </Box>

              <TextField
                label="Bio"
                value={profile.bio}
                onChange={handleChange('bio')}
                fullWidth
                multiline
                minRows={3}
                sx={{ mt: 2 }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" onClick={handleSave}>
                  Salva
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={2} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attività recente
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Hai effettuato il login come {profile.email}.<br />
                • Puoi modificare le informazioni del profilo e saranno salvate solo per questo utente (nel browser).
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}