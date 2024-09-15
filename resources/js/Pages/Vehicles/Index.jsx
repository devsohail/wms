import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Index = ({ vehicles }) => {
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      destroy(route('vehicles.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Link href={route('vehicles.create')}>
          <Button variant="contained" color="primary">Add Vehicle</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Make</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>License Plate</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.license_plate}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>
                  <Link href={route('vehicles.edit', vehicle.id)}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Edit</Button>
                  </Link>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(vehicle.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AuthenticatedLayout>
  );
};

export default Index;