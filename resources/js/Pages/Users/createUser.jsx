import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ clinics, roles }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    role_id: '',
    clinic_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Create User
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
          label="Password"
          type="password"
          value={data.password}
          onChange={e => setData('password', e.target.value)}
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={data.role_id}
            onChange={e => setData('role_id', e.target.value)}
            error={!!errors.role_id}
          >
            {roles.map(role => (
              <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Create User
          </Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;