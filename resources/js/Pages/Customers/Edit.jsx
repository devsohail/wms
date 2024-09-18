import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ customer, salesAgents }) => {
  const { data, setData, put, processing, errors } = useForm({
    code: customer.code || '',
    sales_agent_id: customer.sales_agent_id || '',
    name: customer.name || '',
    email: customer.email || '',
    phone: customer.phone || '',
    address: customer.address || '',
    ship_to_name: customer.ship_to_name || '',
    ship_to_email: customer.ship_to_email || '',
    ship_to_phone: customer.ship_to_phone || '',
    ship_to_address: customer.ship_to_address || '',
  });

  const [sameAsShipTo, setSameAsShipTo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('customers.update', customer.id));
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
        Edit Customer
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer Code"
              value={data.code}
              InputProps={{
                readOnly: true,
              }}
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
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Update Customer
          </Button>
          <Link href={route('customers.index')}>
            <Button variant="outlined" sx={{ ml: 2 }}>Cancel</Button>
          </Link>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Edit;