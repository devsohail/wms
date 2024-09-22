import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';

const Index = ({ customers, flash }) => {
  const { delete: destroy } = useForm();

  useEffect(() => {
    if (flash && flash.type === 'success') {
      showSuccessToast(flash.message);
    } else if (flash && flash.type === 'error') {
      showErrorToast(flash.message);
    }
  }, [flash]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      destroy(route('customers.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Link href={route('customers.create')}>
          <Button variant="contained" color="primary">Create Customer</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.user?.name}</TableCell>
                <TableCell>
                  <Link href={route('customers.edit', customer.id)}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Edit</Button>
                  </Link>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(customer.id)}
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