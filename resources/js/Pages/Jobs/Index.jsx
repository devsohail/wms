import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format, parseISO } from 'date-fns';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const Index = ({ jobs, flash }) => {
  const { post } = useForm();

  useEffect(() => {
    if (flash && flash.type === 'success') {
      showSuccessToast(flash.message);
    } else if (flash && flash.type === 'error') {
      showErrorToast(flash.message);
    }
  }, [flash]);

  const handleFinalize = (id) => {
    if (confirm('Are you sure you want to finalize this job?')) {
      post(route('jobs.finalize', id));
    }
  };

  const handlePrint = (job) => {
    const doc = new jsPDF();

    // Get the base URL of your application
    const baseUrl = window.location.origin;

    // Construct the full URL to your logo image
    const logoUrl = `${baseUrl}/images/Go4Green-logo.png`; // Adjust the path as needed

    // Add logo
    doc.addImage(logoUrl, 'PNG', 10, 10, 50, 20);

    // Add customer details
    doc.setFontSize(14);
    doc.text('Customer Details', 14, 60);
    doc.setFontSize(12);
    doc.text(`Name: ${job.customer?.name || 'N/A'}`, 14, 70);
    doc.text(`Address: ${job.customer?.address || 'N/A'}`, 14, 80);

    // Add job details
    doc.setFontSize(14);
    doc.text('Job Details', 14, 100);
    doc.setFontSize(12);
    doc.autoTable({
      startY: 110,
      head: [['', '']],
      body: [
        ['Job Number', job.job_number || 'N/A'],
        ['Date', job.job_date ? formatDate(job.job_date) : 'N/A'],
        ['Job Nature', job.job_nature || 'N/A'],
        ['Commodity', job.commodity || 'N/A'],
        ['Seal Number', job.cntr_seal_no || 'N/A'],
        ['Vehicle', job.vehicle ? `${job.vehicle.license_plate} - ${job.vehicle.make} ${job.vehicle.model}` : 'N/A'],
        ['Vehicle In', job.vehicle_in || 'N/A'],
        ['Vehicle Out', job.vehicle_out || 'N/A'],
        ['Weight Slip No', job.weight_slip_no || 'N/A'],
        ['Bags/Cartons', job.bags_cartons || 'N/A'],
        ['Pallets', job.pallets || 'N/A'],
        ['Supervisor Sign', job.supervisor_sign || 'N/A'],
        ['Labor Contractor', job.labor_contractor || 'N/A'],
        ['Labor Start Time', job.labor_start_time || 'N/A'],
        ['Labor End Time', job.labor_end_time || 'N/A'],
        ['Lifter Contractor', job.lifter_contractor ? job.lifter_contractor.name : 'N/A'],
        ['Lifter Start Time', job.lifter_start_time || 'N/A'],
        ['Lifter End Time', job.lifter_end_time || 'N/A'],
        ['Status', job.is_finalized ? 'Finalized' : (job.is_draft ? 'Draft' : 'In Progress')],
      ],
      footer: function(currentPage, pageCount) {
        return `Page ${currentPage} of ${pageCount}`;
      }
    });

    doc.save(`job_${job.job_number || 'unknown'}.pdf`);
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
                <TableCell>
                  {job.vehicle 
                    ? `${job.vehicle.license_plate} - ${job.vehicle.make} ${job.vehicle.model}`
                    : 'No Vehicle'
                  }
                </TableCell>
                <TableCell>{job.job_nature || 'N/A'}</TableCell>
                <TableCell>{job.is_finalized ? 'Finalized' : (job.is_draft ? 'Draft' : 'In Draft')}</TableCell>
                <TableCell>
                  {job.is_draft && (
                    <Link href={route('jobs.edit', job.id)}>
                      <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Edit</Button>
                    </Link>
                  )}
                  {!job.is_draft && !job.is_finalized && (
                    <Button 
                      variant="outlined" 
                      color="success" 
                      onClick={() => handleFinalize(job.id)}
                      sx={{ mr: 1 }}
                    >
                      Finalize
                    </Button>
                  )}
                  {job.is_finalized && (
                    <Button 
                      variant="outlined" 
                      color="warning" 
                      onClick={() => handleReopen(job.id)}
                      sx={{ mr: 1 }}
                    >
                      Re-open
                    </Button>
                  )}
                  <Button 
                    variant="outlined" 
                    color="info" 
                    onClick={() => handlePrint(job)}
                  >
                    Print
                  </Button>
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