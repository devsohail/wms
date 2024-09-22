import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';

const Index = ({ roles, flash }) => {
  const { delete: destroy } = useForm();

  useEffect(() => {
    if (flash && flash.type === 'success') {
      showSuccessToast(flash.message);
    } else if (flash && flash.type === 'error') {
      showErrorToast(flash.message);
    }
  }, [flash]);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this role?')) {
      destroy(route('roles.destroy', id));
    }
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Roles
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Link href={route('roles.create')}>
          <Button variant="contained" color="primary">Create Role</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Parent Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.parent ? role.parent.name : 'None'}</TableCell>
                <TableCell>
                  <Link href={route('roles.edit', role.id)}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Edit</Button>
                  </Link>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(role.id)}
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