import React, { useMemo, useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// 30 rreshta fake – mund t’i ndryshosh kur te duash
const allRows = [
  { id: 1, name: 'Alice', role: 'Admin', age: 29 },
  { id: 2, name: 'Bob', role: 'Editor', age: 34 },
  { id: 3, name: 'Carol', role: 'Viewer', age: 22 },
  { id: 4, name: 'Dave', role: 'Editor', age: 45 },
  { id: 5, name: 'Eve', role: 'Viewer', age: 31 },
  { id: 6, name: 'Frank', role: 'Admin', age: 27 },
  { id: 7, name: 'Grace', role: 'Viewer', age: 26 },
  { id: 8, name: 'Heidi', role: 'Editor', age: 37 },
  { id: 9, name: 'Ivan', role: 'Viewer', age: 41 },
  { id: 10, name: 'Judy', role: 'Admin', age: 33 },
  { id: 11, name: 'Karl', role: 'Editor', age: 39 },
  { id: 12, name: 'Laura', role: 'Viewer', age: 24 },
  { id: 13, name: 'Mallory', role: 'Viewer', age: 28 },
  { id: 14, name: 'Niaj', role: 'Admin', age: 36 },
  { id: 15, name: 'Olivia', role: 'Editor', age: 32 },
  { id: 16, name: 'Peggy', role: 'Viewer', age: 30 },
  { id: 17, name: 'Quentin', role: 'Viewer', age: 38 },
  { id: 18, name: 'Rupert', role: 'Admin', age: 42 },
  { id: 19, name: 'Sybil', role: 'Editor', age: 29 },
  { id: 20, name: 'Trent', role: 'Viewer', age: 27 },
  { id: 21, name: 'Uma', role: 'Viewer', age: 23 },
  { id: 22, name: 'Victor', role: 'Admin', age: 44 },
  { id: 23, name: 'Wendy', role: 'Editor', age: 35 },
  { id: 24, name: 'Xavier', role: 'Viewer', age: 40 },
  { id: 25, name: 'Yolanda', role: 'Viewer', age: 25 },
  { id: 26, name: 'Zack', role: 'Admin', age: 28 },
  { id: 27, name: 'Ana', role: 'Viewer', age: 26 },
  { id: 28, name: 'Bruno', role: 'Editor', age: 31 },
  { id: 29, name: 'Clara', role: 'Viewer', age: 33 },
  { id: 30, name: 'Dorian', role: 'Admin', age: 39 }
];

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'role', headerName: 'Role', width: 140 },
  { field: 'age', headerName: 'Age', width: 100, type: 'number' }
];

export default function DetailsPage() {
  const [search, setSearch] = useState('');

  // Filtro mbi TE GJITHE 30 rreshtat
  const filteredRows = useMemo(
    () =>
      allRows.filter((row) =>
        Object.values(row)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Details
      </Typography>

      {/* search bar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <TextField
          label="Filtro..."
          placeholder="Kërko në emër, rol, moshë..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
      </Paper>

      {/* DataGrid me pagination dinamik */}
      <Paper sx={{ height: 500 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          pagination
          // opsionet qe shfaqen te dropdown "Rows per page"
          pageSizeOptions={[5, 10, 15, 25]}
          // gjendja fillestare: pageSize 5
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 }
            }
          }}
        />
      </Paper>
    </Box>
  );
}
