import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { TextField, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    swift_code: '',
    country: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('banks.store'));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Create Bank
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mt: 3 }}>
        <TextField
          fullWidth
          label="Name"
          value={data.name}
          onChange={e => setData('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
        />
        <TextField
          fullWidth
          label="SWIFT Code"
          value={data.swift_code}
          onChange={e => setData('swift_code', e.target.value)}
          error={!!errors.swift_code}
          helperText={errors.swift_code}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Country"
          value={data.country}
          onChange={e => setData('country', e.target.value)}
          error={!!errors.country}
          helperText={errors.country}
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Create Bank
          </Button>
          <Link href={route('banks.index')}>
            <Button variant="outlined" sx={{ ml: 2 }}>Cancel</Button>
          </Link>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;