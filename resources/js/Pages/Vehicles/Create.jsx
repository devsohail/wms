import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    make: '',
    model: '',
    year: '',
    license_plate: '',
    type: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('vehicles.store'));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Add Vehicle
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
            Add Vehicle
          </Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;