import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';

const Index = ({ banks, flash }) => {
  const { delete: destroy } = useForm();

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this bank?')) {
      destroy(route('banks.destroy', id));
    }
  };

  useEffect(() => {
    if (flash && flash.type === 'success') {
      showSuccessToast(flash.message);
    } else if (flash && flash.type === 'error') {
      showErrorToast(flash.message);
    }
  }, [flash]);

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Banks
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Link href={route('banks.create')}>
          <Button variant="contained" color="primary">Create Bank</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>SWIFT Code</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banks.map((bank) => (
              <TableRow key={bank.id}>
                <TableCell>{bank.name}</TableCell>
                <TableCell>{bank.swift_code}</TableCell>
                <TableCell>{bank.country}</TableCell>
                <TableCell>
                  <Link href={route('banks.edit', bank.id)}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Edit</Button>
                  </Link>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(bank.id)}
                  >
                    Delete
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