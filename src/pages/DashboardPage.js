import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  Collapse
} from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TimerIcon from '@mui/icons-material/Timer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// regjistrojmë modulet e Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// të dhënat për kartat
const cards = [
  {
    title: 'Bandi Idonei',
    value: 5,
    gradient: 'linear-gradient(90deg,#22c55e,#0ea5e9)',
    icon: <CheckCircleIcon fontSize="large" />
  },
  {
    title: 'Bandi in Scadenza (≤7 gg)',
    value: 0,
    gradient: 'linear-gradient(90deg,#f97316,#facc15)',
    icon: <TimerIcon fontSize="large" />
  },
  {
    title: 'Totale Bandi',
    value: 8,
    gradient: 'linear-gradient(90deg,#6366f1,#a855f7)',
    icon: <CalendarMonthIcon fontSize="large" />
  }
];

// të dhënat për bar chart me ngjyra
const chartData = {
  labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
  datasets: [
    {
      label: 'Bandi',
      data: [1, 2, 1, 3, 0, 1, 0],
      borderRadius: 8,
      backgroundColor: [
        '#22c55e',
        '#0ea5e9',
        '#6366f1',
        '#f97316',
        '#e11d48',
        '#a855f7',
        '#14b8a6'
      ]
    }
  ]
};

// opsionet e grafikut që ta bëjmë responsive
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: false
    }
  },
  scales: {
    x: {
      grid: { display: false }
    },
    y: {
      ticks: { stepSize: 1 }
    }
  }
};

export default function DashboardPage() {
  // kontrollon nëse seksioni i dashboard-it është i hapur apo i mbyllur
  const [open, setOpen] = useState(true);

  return (
    <Box>
      {/* Header i madh sipër */}
      <Paper
        elevation={0}
        sx={{
          mb: 3,
          px: 4,
          py: 3,
          borderRadius: 4,
          background: 'linear-gradient(90deg,#e5f0ff,#f9fafb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Benvenuto nella Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Buton refresh (fake) */}
          <IconButton>
            <RefreshIcon />
          </IconButton>

          {/* Buton që hap/mbyll gjithë seksionin poshtë */}
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      </Paper>

      {/* Seksioni që hapet/mbyllet */}
      <Collapse in={open}>
        {/* ================== BLOKU 1: 3 KARTAT SIPËR ================== */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={3}>
            {cards.map((card) => (
              <Grid item xs={12} md={4} key={card.title}>
                <Card
                  elevation={6}
                  sx={{
                    borderRadius: 4,
                    background: card.gradient,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 3
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="subtitle2">
                      {card.title}
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{ mt: 1 }}
                    >
                      {card.value}
                    </Typography>
                  </CardContent>

                  {/* Ikona djathtas në kartë */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: 3,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2
                    }}
                  >
                    {card.icon}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ================== BLOKU 2: GRAFIKU POSHTË KARTAVE ================== */}
        <Box sx={{ mb: 3 }}>
          <Paper sx={{ p: 3, borderRadius: 4 }} elevation={4}>
            <Typography variant="h6" mb={2}>
              Andamento settimanale
            </Typography>
            <Box sx={{ height: 260 }}>
              <Bar data={chartData} options={chartOptions} />
            </Box>
          </Paper>
        </Box>

        {/* ================== BLOKU 3: NOTE POSHTË GRAFIKUT ================== */}
        <Box>
          <Paper sx={{ p: 3, borderRadius: 4 }} elevation={4}>
            <Typography variant="h6" mb={1}>
              Note
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tutto questo è solo demo con dati statici.
              In futuro puoi collegare API reali.
            </Typography>
          </Paper>
        </Box>
      </Collapse>
    </Box>
  );
}
