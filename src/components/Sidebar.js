import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableRowsIcon from '@mui/icons-material/TableRows';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLocation, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = collapsed ? 72 : 220;

  const items = [
    { label: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { label: 'Details', icon: <TableRowsIcon />, path: '/details' },
    { label: 'Profile', icon: <PersonIcon />, path: '/profile' } 
    
  ];

  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.2s ease'
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #1d4ed8, #0ea5e9)',
            color: '#fff',
            borderRight: 'none',
            overflowX: 'hidden',
            transition: 'width 0.2s ease'
          }
        }}
      >
        {/* Header i sidebar-it: logo + buton për collapse */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            gap: 1,
            fontWeight: 'bold',
            fontSize: collapsed ? 0 : 20
          }}
        >
          {/* Logo e thjeshtë rrethore */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              border: '2px solid #e0f2fe',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: 14
            }}
          >
            J.k
          </Box>

          {/* Teksti shfaqet vetëm kur nuk është collapsed */}
          {!collapsed && 'MiniDash'}

          {/* Buton për hap/mbyll sidebar-in */}
          <IconButton
            size="small"
            onClick={onToggle}
            sx={{ ml: collapsed ? 0 : 1, color: '#e0f2fe' }}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Box>

        {/* Lista e menuse */}
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.label}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: 2,
                justifyContent: collapsed ? 'center' : 'flex-start',
                '&.Mui-selected': {
                  backgroundColor: '#e0f2fe',
                  color: '#0f172a',
                  '& .MuiListItemIcon-root': { color: '#0f172a' }
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: collapsed ? 'auto' : 40,
                  mr: collapsed ? 0 : 1
                }}
              >
                {item.icon}
              </ListItemIcon>

              {/* Teksti i menu-së vetëm kur sidebar është i hapur */}
              {!collapsed && <ListItemText primary={item.label} />}
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
