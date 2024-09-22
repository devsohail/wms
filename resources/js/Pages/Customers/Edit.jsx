import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Grid, Checkbox, FormControlLabel } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';

const Edit = ({ customer, salesAgents, flash }) => {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT', // Add this line to simulate a PUT request
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
    license_file: null,
    trn: customer.trn || '',
  });

  const [sameAsShipTo, setSameAsShipTo] = useState(false);

  useEffect(() => {
    if (flash?.success) {
      showSuccessToast(flash.success);
    }
    if (flash?.error) {
      showErrorToast(flash.error);
    }
  }, [flash]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all form fields to FormData
    Object.keys(data).forEach(key => {
      if (key === 'license_file' && data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    post(route('customers.update', customer.id), formData, {
      forceFormData: true,
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        showSuccessToast('Customer updated successfully');
      },
      onError: (errors) => {
        showErrorToast('An error occurred while updating the customer');
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

  const handleTrnChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    setData('trn', value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setData('license_file', e.target.files[0]);
    }
  };

  const getErrorMessage = (fieldName) => {
    return errors[fieldName] || '';
  };

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
              onChange={(e) => setData('code', e.target.value)}
              error={!!errors.code}
              helperText={getErrorMessage('code')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.sales_agent_id}>
              <InputLabel>Sales Agent</InputLabel>
              <Select
                value={data.sales_agent_id}
                onChange={(e) => setData('sales_agent_id', e.target.value)}
                label="Sales Agent"
              >
                <MenuItem value="">None</MenuItem>
                {salesAgents.map((agent) => (
                  <MenuItem key={agent.id} value={agent.id}>{agent.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              error={!!errors.name}
              helperText={getErrorMessage('name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              error={!!errors.email}
              helperText={getErrorMessage('email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              value={data.phone}
              onChange={(e) => setData('phone', e.target.value)}
              error={!!errors.phone}
              helperText={getErrorMessage('phone')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={3}
              value={data.address}
              onChange={(e) => setData('address', e.target.value)}
              error={!!errors.address}
              helperText={getErrorMessage('address')}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsShipTo}
                  onChange={handleSameAsShipToChange}
                />
              }
              label="Ship to address same as above"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ship to Name"
              value={data.ship_to_name}
              onChange={(e) => setData('ship_to_name', e.target.value)}
              error={!!errors.ship_to_name}
              helperText={getErrorMessage('ship_to_name')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ship to Email"
              value={data.ship_to_email}
              onChange={(e) => setData('ship_to_email', e.target.value)}
              error={!!errors.ship_to_email}
              helperText={getErrorMessage('ship_to_email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ship to Phone"
              value={data.ship_to_phone}
              onChange={(e) => setData('ship_to_phone', e.target.value)}
              error={!!errors.ship_to_phone}
              helperText={getErrorMessage('ship_to_phone')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ship to Address"
              multiline
              rows={3}
              value={data.ship_to_address}
              onChange={(e) => setData('ship_to_address', e.target.value)}
              error={!!errors.ship_to_address}
              helperText={getErrorMessage('ship_to_address')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="TRN"
              value={data.trn}
              onChange={handleTrnChange}
              error={!!errors.trn}
              helperText={getErrorMessage('trn')}
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
                Upload New License File
              </Button>
            </label>
            {data.license_file && <Typography variant="body2">{data.license_file.name}</Typography>}
            {errors.license_file && <Typography color="error">{errors.license_file}</Typography>}
            {customer.license_file && (
              <Button onClick={() => window.open(`/storage/${customer.license_file}`, '_blank')} sx={{ ml: 2 }}>
                Download Current License
              </Button>
            )}
          </Grid>
        </Grid>
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