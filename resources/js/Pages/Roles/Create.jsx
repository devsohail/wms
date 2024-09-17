import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ roles }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    parent_id: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('roles.store'));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Create Role
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
        <FormControl fullWidth margin="normal">
          <InputLabel>Parent Role</InputLabel>
          <Select
            value={data.parent_id}
            onChange={e => setData('parent_id', e.target.value)}
            error={!!errors.parent_id}
          >
            <MenuItem value="">None</MenuItem>
            {roles.map(role => (
              <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Create Role
          </Button>
          <Link href={route('roles.index')}>
            <Button variant="outlined" sx={{ ml: 2 }}>Cancel</Button>
          </Link>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;