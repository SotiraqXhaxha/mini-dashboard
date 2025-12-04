// MainLayout.js
// Layout-i kryesor: Sidebar majtas, Topbar sipër dhe content poshtë.
// Këtu mbajmë gjendjen collapsed e sidebar-it që të ndikojë në layout.

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function MainLayout({ children, onLogout }) {
  // collapsed = true -> sidebar i ngushtë (vetëm ikona)
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Menuja anësore */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      {/* Kolona kryesore */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0, // e rëndësishme që grid/chart të mos dalin jashtë
          transition: 'all 0.2s ease'
        }}
      >
        {/* Shirit sipër me logo + logout */}
        <Topbar onLogout={onLogout} />

        {/* Zona e faqeve (dashboard, details) */}
        <Box
          component="main"
          sx={{
            p: 3,
            bgcolor: 'background.default',
            flex: 1,
            overflow: 'auto'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
