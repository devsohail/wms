import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Typography, Box, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Grid, Radio, RadioGroup } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ job, vehicles, labourers, lifters, customers }) => {
  const [contractorType, setContractorType] = useState(job.contractor_type || 'labour');

  const { data, setData, put, processing, errors } = useForm({
    job_number: job.job_number || '',
    date: job.date || '',
    job_nature: job.job_nature || '',
    client_id: job.client_id || '',
    vehicle_id: job.vehicle_id || '',
    ctrn_number: job.ctrn_number || '',
    seal_number: job.seal_number || '',
    storage_price: job.storage_price || '',
    storage_rate: job.storage_rate || '',
    handling_in_price: job.handling_in_price || '',
    contractor_type: job.contractor_type || 'labour',
    contractor_id: job.contractor_id || '',
    repacking: job.repacking || false,
    comment: job.comment || '',
    remarks: job.remarks || '',
    image: null,
    commodity: job.commodity || '',
    handling_out_charges: job.handling_out_charges || '',
    authorized_gate_pass_name: job.authorized_gate_pass_name || '',
    paid_amount: job.paid_amount || '',
    material_used: job.material_used || '',
    payment: job.payment || '',
    storage_in_job_number: job.storage_in_job_number || '',
    is_draft: job.is_draft,
  });

  useEffect(() => {
    setContractorType(data.contractor_type);
  }, [data.contractor_type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('jobs.update', job.id));
  };

  const handleContractorTypeChange = (e) => {
    const type = e.target.value;
    setContractorType(type);
    setData('contractor_type', type);
    setData('contractor_id', ''); // Reset the contractor selection when type changes
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Edit Job
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
            <TextField
              label="Date"
              type="date"
              value={data.date}
              onChange={e => setData('date', e.target.value)}
              error={!!errors.date}
              helperText={errors.date}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
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
                value={data.client_id}
                onChange={e => setData('client_id', e.target.value)}
                error={!!errors.client_id}
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
            <FormControl component="fieldset">
              <Typography variant="subtitle1">Contractor Type</Typography>
              <RadioGroup
                row
                value={data.contractor_type}
                onChange={handleContractorTypeChange}
              >
                <FormControlLabel value="labour" control={<Radio />} label="Labour" />
                <FormControlLabel value="lifter" control={<Radio />} label="Lifter" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="contractor-label">
                {contractorType === 'labour' ? 'Labour Contractor' : 'Lifter Contractor'}
              </InputLabel>
              <Select
                labelId="contractor-label"
                value={data.contractor_id}
                onChange={e => setData('contractor_id', e.target.value)}
                error={!!errors.contractor_id}
              >
                {(contractorType === 'labour' ? labourers : lifters).map((contractor) => (
                  <MenuItem key={contractor.id} value={contractor.id}>
                    {contractor.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
            Update Job
          </Button>
        </Box>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Edit;