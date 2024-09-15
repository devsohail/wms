import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format, parseISO } from 'date-fns';

const Index = ({ jobs }) => {
  const { delete: destroy, post } = useForm();

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this job?')) {
      destroy(route('jobs.destroy', id));
    }
  };

  const handleFinalize = (id) => {
    if (confirm('Are you sure you want to finalize this job?')) {
      post(route('jobs.finalize', id));
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(parseISO(dateString), 'dd/MM/yyyy');
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Jobs
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Link href={route('jobs.create')}>
          <Button variant="contained" color="primary">Create Job</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Job Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Vehicle</TableCell>
              <TableCell>Job Nature</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.job_number}</TableCell>
                <TableCell>{formatDate(job.job_date)}</TableCell>
                <TableCell>{job.customer ? job.customer.name : 'N/A'}</TableCell>
                <TableCell>{job.vehicle.license_plate} - {job.vehicle.make} {job.vehicle.model}</TableCell>
                <TableCell>{job.job_nature}</TableCell>
                <TableCell>{job.is_finalized ? 'Finalized' : (job.is_draft ? 'Draft' : 'In Progress')}</TableCell>
                <TableCell>
                  <Link href={route('jobs.edit', job.id)}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Edit</Button>
                  </Link>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(job.id)}
                    sx={{ mr: 1 }}
                  >
                    Delete
                  </Button>
                  {!job.is_finalized && (
                    <Button 
                      variant="outlined" 
                      color="success" 
                      onClick={() => handleFinalize(job.id)}
                    >
                      Finalize
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AuthenticatedLayout>
  );
};

export default Index;