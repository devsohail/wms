import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ roles }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    role_id: '',
    create_user: false,
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('staff.store'));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Create Staff
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
          label="Email"
          type="email"
          value={data.email}
          onChange={e => setData('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Phone"
          value={data.phone}
          onChange={e => setData('phone', e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={data.create_user}
              onChange={e => setData('create_user', e.target.checked)}
            />
          }
          label="Create user account"
        />
        {data.create_user && (
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            margin="normal"
          />
        )}
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Create Staff
          </Button>
          <Link href={route('staff.index')}>
            <Button variant="outlined" sx={{ ml: 2 }}>Cancel</Button>
          </Link>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;