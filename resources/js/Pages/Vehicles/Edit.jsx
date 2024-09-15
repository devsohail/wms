import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ vehicle }) => {
  const { data, setData, put, processing, errors } = useForm({
    make: vehicle.make || '',
    model: vehicle.model || '',
    year: vehicle.year || '',
    license_plate: vehicle.license_plate || '',
    type: vehicle.type || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('vehicles.update', vehicle.id));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Edit Vehicle
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
        <TextField
          label="Make"
          value={data.make}
          onChange={e => setData('make', e.target.value)}
          error={!!errors.make}
          helperText={errors.make}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Model"
          value={data.model}
          onChange={e => setData('model', e.target.value)}
          error={!!errors.model}
          helperText={errors.model}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          type="number"
          value={data.year}
          onChange={e => setData('year', e.target.value)}
          error={!!errors.year}
          helperText={errors.year}
          fullWidth
          margin="normal"
        />
        <TextField
          label="License Plate"
          value={data.license_plate}
          onChange={e => setData('license_plate', e.target.value)}
          error={!!errors.license_plate}
          helperText={errors.license_plate}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Type"
          value={data.type}
          onChange={e => setData('type', e.target.value)}
          error={!!errors.type}
          helperText={errors.type}
          fullWidth
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Update Vehicle
          </Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Edit;