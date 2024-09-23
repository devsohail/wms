import React, { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box, Grid, FormHelperText, RadioGroup, FormControlLabel, Radio, Checkbox } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const Edit = ({ job, customers, vehicles, laborContractors, lifters, flash }) => {
  const { data, setData, put, processing, errors } = useForm({
    customer_id: job.customer_id || '',
    job_number: job.job_number || '',
    job_date: job.job_date || null,
    commodity: job.commodity || '',
    cntr_seal_no: job.cntr_seal_no || '',
    vehicle_id: job.vehicle_id || '',
    weight_slip_no: job.weight_slip_no || '',
    storage_type: job.storage_type || '',
    supervisor_sign: job.supervisor_sign || '',
    vehicle_in: job.vehicle_in || null,
    vehicle_out: job.vehicle_out || null,
    bags_cartons: job.bags_cartons || '',
    pallets: job.pallets || '',
    labour_contractor_id: job.labour_contractor_id || '',
    labors_count: job.labors_count || '',
    labor_start_time: job.labor_start_time || null,
    labor_end_time: job.labor_end_time || null,
    lifter_contractor_id: job.lifter_contractor_id || '',
    lifter_start_time: job.lifter_start_time || null,
    lifter_end_time: job.lifter_end_time || null,
    is_draft: job.is_draft || false,
  });

  const [showLaborTimes, setShowLaborTimes] = useState(!!data.labour_contractor_id);
  const [showLifterTimes, setShowLifterTimes] = useState(!!data.lifter_contractor_id);

  useEffect(() => {
    if (flash?.error) {
      showErrorToast(flash.error);
    }
    setShowLaborTimes(!!data.labour_contractor_id);
    setShowLifterTimes(!!data.lifter_contractor_id);
  }, [data.labour_contractor_id, data.lifter_contractor_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('jobs.update', job.id), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        showSuccessToast('Job updated successfully');
      },
      onError: () => {
        showErrorToast('An error occurred while updating the job');
      },
    });
  };

  const handleStorageChange = (event) => {
    setData('storage_type', event.target.value);
  };
  const handleTimeChange = (field, value) => {
    setData(field, value ? dayjs(value).format('HH:mm') : null);
  };

  const [showVehicleTimes, setShowVehicleTimes] = useState(!!data.vehicle_id);

  useEffect(() => {
    if (flash?.error) {
      showErrorToast(flash.error);
    }
    setShowVehicleTimes(!!data.vehicle_id);
  }, [data.vehicle_id]);



  return (
    <AuthenticatedLayout>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typography variant="h4" gutterBottom>
          Edit Job
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.customer_id}>
                <InputLabel id="customer-select-label">Customer</InputLabel>
                <Select
                  labelId="customer-select-label"
                  id="customer-select"
                  value={data.customer_id}
                  onChange={(e) => setData('customer_id', e.target.value)}
                  label="Customer"
                >
                  <MenuItem value="">
                    <em>Select a customer</em>
                  </MenuItem>
                  {customers.map(customer => (
                    <MenuItem key={customer.id} value={customer.id}>{customer.name}</MenuItem>
                  ))}
                </Select>
                {errors.customer_id && <FormHelperText>{errors.customer_id}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Number"
                value={data.job_number}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Job Date"
                value={data.job_date}
                onChange={(date) => setData('job_date', date)}
                renderInput={(params) => <TextField {...params} fullWidth error={!!errors.job_date} helperText={errors.job_date} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Commodity"
                value={data.commodity}
                onChange={e => setData('commodity', e.target.value)}
                error={!!errors.commodity}
                helperText={errors.commodity}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CNTR / Seal No."
                value={data.cntr_seal_no}
                onChange={e => setData('cntr_seal_no', e.target.value)}
                error={!!errors.cntr_seal_no}
                helperText={errors.cntr_seal_no}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.vehicle_id}>
                <InputLabel id="vehicle-select-label">Vehicle</InputLabel>
                <Select
                  labelId="vehicle-select-label"
                  id="vehicle-select"
                  value={data.vehicle_id}
                  onChange={(e) => {
                    setData('vehicle_id', e.target.value);
                    setShowVehicleTimes(!!e.target.value);
                  }}
                  label="Vehicle"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {vehicles.map(vehicle => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.license_plate}
                    </MenuItem>
                  ))}
                </Select>
                {errors.vehicle_id && <FormHelperText>{errors.vehicle_id}</FormHelperText>}
              </FormControl>
            </Grid>

            {showVehicleTimes && (
              <>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Vehicle In"
                    value={data.vehicle_in ? dayjs(data.vehicle_in, 'HH:mm') : null}
                    onChange={(time) => handleTimeChange('vehicle_in', time)}
                    ampm={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.vehicle_in}
                        helperText={errors.vehicle_in}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Vehicle Out"
                    value={data.vehicle_out ? dayjs(data.vehicle_out, 'HH:mm') : null}
                    onChange={(time) => handleTimeChange('vehicle_out', time)}
                    ampm={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={!!errors.vehicle_out}
                        helperText={errors.vehicle_out}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Weight Slip No."
                value={data.weight_slip_no}
                onChange={e => setData('weight_slip_no', e.target.value)}
                error={!!errors.weight_slip_no}
                helperText={errors.weight_slip_no}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" error={!!errors.storage_type}>
                <Typography variant="subtitle1" gutterBottom>Storage Type</Typography>
                <RadioGroup
                  row
                  aria-label="storage-type"
                  name="storage_type"
                  value={data.storage_type}
                  onChange={handleStorageChange}
                >
                  <FormControlLabel value="in" control={<Radio />} label="Storage In" />
                  <FormControlLabel value="out" control={<Radio />} label="Storage Out" />
                </RadioGroup>
                {errors.storage_type && <FormHelperText>{errors.storage_type}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pallets"
                type="number"
                inputProps={{ min: 0 }}
                value={data.pallets}
                onChange={e => setData('pallets', e.target.value)}
                error={!!errors.pallets}
                helperText={errors.pallets}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.labour_contractor_id}>
                <InputLabel id="labour-contractor-select-label">Labour Contractor</InputLabel>
                <Select
                  labelId="labour-contractor-select-label"
                  id="labour-contractor-select"
                  value={data.labour_contractor_id}
                  onChange={(e) => {
                    setData('labour_contractor_id', e.target.value);
                    setShowLaborTimes(!!e.target.value);
                  }}
                  label="Labour Contractor"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {laborContractors.map(contractor => (
                    <MenuItem key={contractor.id} value={contractor.id}>{contractor.name}</MenuItem>
                  ))}
                </Select>
                {errors.labour_contractor_id && <FormHelperText>{errors.labour_contractor_id}</FormHelperText>}
              </FormControl>
            </Grid>

            {showLaborTimes && (
              <>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Labor Start Time"
                    value={data.labor_start_time ? dayjs(data.labor_start_time, 'HH:mm') : null}
                    onChange={(time) => handleTimeChange('labor_start_time', time)}
                    ampm={false}
                    renderInput={(params) => <TextField {...params} fullWidth error={!!errors.labor_start_time} helperText={errors.labor_start_time} />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Labor End Time"
                    value={data.labor_end_time ? dayjs(data.labor_end_time, 'HH:mm') : null}
                    onChange={(time) => handleTimeChange('labor_end_time', time)}
                    ampm={false}
                    renderInput={(params) => <TextField {...params} fullWidth error={!!errors.labor_end_time} helperText={errors.labor_end_time} />}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Labors Count"
                type="number"
                inputProps={{ min: 0 }}
                value={data.labors_count}
                onChange={e => setData('labors_count', e.target.value)}
                error={!!errors.labors_count}
                helperText={errors.labors_count}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.lifter_contractor_id}>
                <InputLabel id="lifter-contractor-select-label">Lifter Contractor</InputLabel>
                <Select
                  labelId="lifter-contractor-select-label"
                  id="lifter-contractor-select"
                  value={data.lifter_contractor_id}
                  onChange={(e) => {
                    setData('lifter_contractor_id', e.target.value);
                    setShowLifterTimes(!!e.target.value);
                  }}
                  label="Lifter Contractor"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {lifters.map(lifter => (
                    <MenuItem key={lifter.id} value={lifter.id}>{lifter.name}</MenuItem>
                  ))}
                </Select>
                {errors.lifter_contractor_id && <FormHelperText>{errors.lifter_contractor_id}</FormHelperText>}
              </FormControl>
            </Grid>

            {showLifterTimes && (
              <>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Lifter Start Time"
                    value={data.lifter_start_time ? dayjs(data.lifter_start_time, 'HH:mm') : null}
                    onChange={(time) => handleTimeChange('lifter_start_time', time)}
                    ampm={false}
                    renderInput={(params) => <TextField {...params} fullWidth error={!!errors.lifter_start_time} helperText={errors.lifter_start_time} />}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Lifter End Time"
                    value={data.lifter_end_time ? dayjs(data.lifter_end_time, 'HH:mm') : null}
                    onChange={(time) => handleTimeChange('lifter_end_time', time)}
                    ampm={false}
                    renderInput={(params) => <TextField {...params} fullWidth error={!!errors.lifter_end_time} helperText={errors.lifter_end_time} />}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.is_draft}
                    onChange={(e) => setData('is_draft', e.target.checked)}
                  />
                }
                label="Save as Draft"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={processing}>
              {processing ? 'Saving...' : 'Save Job'}
            </Button>
            <Button component={Link} href={route('jobs.index')} variant="outlined" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </AuthenticatedLayout>
  );
};

export default Edit;