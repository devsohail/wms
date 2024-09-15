import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ customer }) => {
  const { data, setData, put, processing, errors } = useForm({
    name: customer.name || '',
    email: customer.email || '',
    phone: customer.phone || '',
    address: customer.address || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('customers.update', customer.id));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Edit Customer
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
        <TextField
          label="Name"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          value={data.phone}
          onChange={e => setData('phone', e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          value={data.address}
          onChange={e => setData('address', e.target.value)}
          error={!!errors.address}
          helperText={errors.address}
          fullWidth
          margin="normal"
          multiline
          rows={3}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Update Customer
          </Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Edit;