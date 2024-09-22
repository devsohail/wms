import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Grid, Checkbox, FormControlLabel, Alert } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ salesAgents, nextCode, flash }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    code: nextCode,
    sales_agent_id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    ship_to_name: '',
    ship_to_email: '',
    ship_to_phone: '',
    ship_to_address: '',
    license_file: null,
    trn: '',
  });

  const [sameAsShipTo, setSameAsShipTo] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  useEffect(() => {
    if (flash?.error) {
      showErrorToast(flash.error);
    }
  }, [flash]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError(null);
    post(route('customers.store'), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        reset();
      },
      onError: (errors) => {
        if (errors.general) {
          setGeneralError(errors.general);
        }
      },
    });
  };

  const handleSameAsShipToChange = (e) => {
    setSameAsShipTo(e.target.checked);
    if (e.target.checked) {
      setData({
        ...data,
        ship_to_name: data.name,
        ship_to_email: data.email,
        ship_to_phone: data.phone,
        ship_to_address: data.address,
      });
    }
  };

  const handleFileChange = (e) => {
    setData('license_file', e.target.files[0]);
  };

  const handleTrnChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setData('trn', value);
  };

  useEffect(() => {
    if (sameAsShipTo) {
      setData({
        ...data,
        ship_to_name: data.name,
        ship_to_email: data.email,
        ship_to_phone: data.phone,
        ship_to_address: data.address,
      });
    }
  }, [data.name, data.email, data.phone, data.address, sameAsShipTo]);

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Create Customer
      </Typography>
      {generalError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {generalError}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer Code"
              value={data.code}
              onChange={e => setData('code', e.target.value)}
              error={!!errors.code}
              helperText={errors.code}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.sales_agent_id}>
              <InputLabel>Sales Agent</InputLabel>
              <Select
                value={data.sales_agent_id}
                onChange={e => setData('sales_agent_id', e.target.value)}
                label="Sales Agent"
              >
                <MenuItem value="">None</MenuItem>
                {salesAgents.map(agent => (
                  <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Customer Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Customer Details</Typography>
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={data.address}
              onChange={e => setData('address', e.target.value)}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          
          {/* Ship to Party Details */}
          <Grid item xs={12}>
            <Typography variant="h6">Ship to Party Details</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsShipTo}
                  onChange={handleSameAsShipToChange}
                />
              }
              label="Same as Customer Details"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Name"
              value={data.ship_to_name}
              onChange={e => setData('ship_to_name', e.target.value)}
              error={!!errors.ship_to_name}
              helperText={errors.ship_to_name}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={data.ship_to_email}
              onChange={e => setData('ship_to_email', e.target.value)}
              error={!!errors.ship_to_email}
              helperText={errors.ship_to_email}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Phone"
              value={data.ship_to_phone}
              onChange={e => setData('ship_to_phone', e.target.value)}
              error={!!errors.ship_to_phone}
              helperText={errors.ship_to_phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={data.ship_to_address}
              onChange={e => setData('ship_to_address', e.target.value)}
              error={!!errors.ship_to_address}
              helperText={errors.ship_to_address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="TRN"
              value={data.trn}
              onChange={handleTrnChange}
              error={!!errors.trn}
              helperText={errors.trn}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              style={{ display: 'none' }}
              id="license-file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="license-file-upload">
              <Button variant="contained" component="span">
                Upload License File
              </Button>
            </label>
            {data.license_file && <Typography variant="body2">{data.license_file.name}</Typography>}
            {errors.license_file && <Typography color="error">{errors.license_file}</Typography>}
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Create Customer
          </Button>
          <Link href={route('customers.index')}>
            <Button variant="outlined" sx={{ ml: 2 }}>Cancel</Button>
          </Link>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;