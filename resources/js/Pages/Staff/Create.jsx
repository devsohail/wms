import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Grid } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ roles, banks, nextCode }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    role_id: '',
    code: nextCode,
    bank_id: '',
    iban: '',
    account_number: '',
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
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Name"
              value={data.name}
              onChange={e => setData('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Phone"
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={!!errors.role_id}>
              <InputLabel>Role</InputLabel>
              <Select
                value={data.role_id}
                onChange={e => setData('role_id', e.target.value)}
                label="Role"
              >
                {roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Code"
              value={data.code}
              onChange={e => setData('code', e.target.value)}
              error={!!errors.code}
              helperText={errors.code}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth error={!!errors.bank_id}>
              <InputLabel>Bank</InputLabel>
              <Select
                value={data.bank_id}
                onChange={e => setData('bank_id', e.target.value)}
                label="Bank"
              >
                <MenuItem value="">None</MenuItem>
                {banks.map((bank) => (
                  <MenuItem key={bank.id} value={bank.id}>{bank.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="IBAN"
              value={data.iban}
              onChange={e => setData('iban', e.target.value)}
              error={!!errors.iban}
              helperText={errors.iban}
              inputProps={{ maxLength: 23 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Account Number"
              value={data.account_number}
              onChange={e => setData('account_number', e.target.value)}
              error={!!errors.account_number}
              helperText={errors.account_number}
              inputProps={{ maxLength: 12 }}
            />
          </Grid>
        </Grid>
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