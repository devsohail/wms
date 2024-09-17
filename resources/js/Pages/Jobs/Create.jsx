import React from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Typography, Box, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Grid } from '@mui/material';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = ({ vehicles, labourers, lifters, customers }) => {
  const { data, setData, post, processing, errors } = useForm({
    job_number: '',
    job_date: null,
    job_nature: '',
    client_name: '',
    vehicle_id: '',
    ctrn_number: '',
    seal_number: '',
    storage_price: '',
    storage_rate: '',
    handling_in_price: '',
    contractor_type: 'labour',
    contractor_id: '',
    repacking: false,
    comment: '',
    remarks: '',
    image: null,
    commodity: '',
    handling_out_charges: '',
    authorized_gate_pass_name: '',
    paid_amount: '',
    material_used: '',
    payment: '',
    storage_in_job_number: '',
    is_draft: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = { ...data };
    if (formattedData.job_date instanceof Date) {
      formattedData.job_date = formattedData.job_date.toISOString().split('T')[0];
    }
    post(route('jobs.store'), formattedData);
  };

  const handleContractorTypeChange = (e) => {
    const newContractorType = e.target.value;
    setData(prevData => ({
      ...prevData,
      contractor_type: newContractorType,
      contractor_id: '', // Reset contractor_id when type changes
    }));
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Create Job
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Job Number"
              value={data.job_number}
              onChange={e => setData('job_number', e.target.value)}
              error={!!errors.job_number}
              helperText={errors.job_number}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              selected={data.job_date}
              onChange={(date) => setData('job_date', date)}
              dateFormat="yyyy-MM-dd"
              customInput={
                <TextField
                  label="Job Date"
                  error={!!errors.job_date}
                  helperText={errors.job_date}
                  fullWidth
                  margin="normal"
                />
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Job Nature"
              value={data.job_nature}
              onChange={e => setData('job_nature', e.target.value)}
              error={!!errors.job_nature}
              helperText={errors.job_nature}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="client-label">Client Name</InputLabel>
              <Select
                labelId="client-label"
                value={data.client_name}
                onChange={e => setData('client_name', e.target.value)}
                error={!!errors.client_name}
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="vehicle-label">Vehicle</InputLabel>
              <Select
                labelId="vehicle-label"
                value={data.vehicle_id}
                onChange={e => setData('vehicle_id', e.target.value)}
                error={!!errors.vehicle_id}
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.license_plate} - {vehicle.make} {vehicle.model}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="CTRN Number"
              value={data.ctrn_number}
              onChange={e => setData('ctrn_number', e.target.value)}
              error={!!errors.ctrn_number}
              helperText={errors.ctrn_number}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Seal Number"
              value={data.seal_number}
              onChange={e => setData('seal_number', e.target.value)}
              error={!!errors.seal_number}
              helperText={errors.seal_number}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Storage Price"
              type="number"
              value={data.storage_price}
              onChange={e => setData('storage_price', e.target.value)}
              error={!!errors.storage_price}
              helperText={errors.storage_price}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Storage Rate"
              type="number"
              value={data.storage_rate}
              onChange={e => setData('storage_rate', e.target.value)}
              error={!!errors.storage_rate}
              helperText={errors.storage_rate}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Handling In Price"
              type="number"
              value={data.handling_in_price}
              onChange={e => setData('handling_in_price', e.target.value)}
              error={!!errors.handling_in_price}
              helperText={errors.handling_in_price}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="contractor-type-label">Contractor Type</InputLabel>
              <Select
                labelId="contractor-type-label"
                value={data.contractor_type}
                onChange={handleContractorTypeChange}
              >
                <MenuItem value="labour">Labour</MenuItem>
                <MenuItem value="lifter">Lifter</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="contractor-label">Contractor</InputLabel>
              <Select
                labelId="contractor-label"
                value={data.contractor_id}
                onChange={e => setData('contractor_id', e.target.value)}
                error={!!errors.contractor_id}
              >
                {(data.contractor_type === 'labour' ? labourers : lifters).map((contractor) => (
                  <MenuItem key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Commodity"
              value={data.commodity}
              onChange={e => setData('commodity', e.target.value)}
              error={!!errors.commodity}
              helperText={errors.commodity}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Handling Out Charges"
              type="number"
              value={data.handling_out_charges}
              onChange={e => setData('handling_out_charges', e.target.value)}
              error={!!errors.handling_out_charges}
              helperText={errors.handling_out_charges}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Authorized Gate Pass Name"
              value={data.authorized_gate_pass_name}
              onChange={e => setData('authorized_gate_pass_name', e.target.value)}
              error={!!errors.authorized_gate_pass_name}
              helperText={errors.authorized_gate_pass_name}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Paid Amount"
              type="number"
              value={data.paid_amount}
              onChange={e => setData('paid_amount', e.target.value)}
              error={!!errors.paid_amount}
              helperText={errors.paid_amount}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Material Used"
              value={data.material_used}
              onChange={e => setData('material_used', e.target.value)}
              error={!!errors.material_used}
              helperText={errors.material_used}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Payment"
              value={data.payment}
              onChange={e => setData('payment', e.target.value)}
              error={!!errors.payment}
              helperText={errors.payment}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Storage In Job Number"
              value={data.storage_in_job_number}
              onChange={e => setData('storage_in_job_number', e.target.value)}
              error={!!errors.storage_in_job_number}
              helperText={errors.storage_in_job_number}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.repacking}
                  onChange={e => setData('repacking', e.target.checked)}
                />
              }
              label="Repacking"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Comment"
              value={data.comment}
              onChange={e => setData('comment', e.target.value)}
              error={!!errors.comment}
              helperText={errors.comment}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Remarks"
              value={data.remarks}
              onChange={e => setData('remarks', e.target.value)}
              error={!!errors.remarks}
              helperText={errors.remarks}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.is_draft}
                  onChange={e => setData('is_draft', e.target.checked)}
                />
              }
              label="Save as Draft"
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" disabled={processing}>
            Create Job
          </Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;