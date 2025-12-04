import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Topbar({ onLogout }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'linear-gradient(90deg, #1d4ed8, #22c55e)',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        px: 3,
        py: 1
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Titulli majtas */}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Dashboard
        </Typography>

        {/* Butoni Logout djathtas */}
        <Box>
          <Button
            variant="contained"
            color="inherit"
            onClick={onLogout}
            startIcon={<LogoutIcon />}
            sx={{
              textTransform: 'none',
              borderRadius: 999,
              fontWeight: 'bold',
              backgroundColor: '#0f172a',
              color: '#fff',
              '&:hover': { backgroundColor: '#020617' }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
