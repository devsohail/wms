import React, { useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UsersIcon from '@mui/icons-material/Person';
import UserAddIcon from '@mui/icons-material/PersonAdd';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';
const Index = ({ users, activeUsers, inactiveUsers, flash }) => {
  const { delete: destroy } = useForm();

  useEffect(() => {
    if (flash && flash.type === 'success') {
      showSuccessToast(flash.message);
    } else if (flash && flash.type === 'error') {
      showErrorToast(flash.message);
    }
  }, [flash]);

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      destroy(route('users.destroy', userId));
    }
  };

  return (
    <AuthenticatedLayout>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <Box  sx={{
          width: 200,
          height: 150,
          borderRadius: 1,
          bgcolor: 'success.main',
          '&:hover': {
            bgcolor: 'success.dark',
          },
          mb:2,
          mr:2,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography variant="h5" color="white">Active <UsersIcon ></UsersIcon>: {activeUsers}</Typography>
       </Box>
       <Box sx={{
          width: 200,
          height: 150,
          borderRadius: 1,
          bgcolor: 'error.main',
          '&:hover': {
            bgcolor: 'error.dark',
          },
          mb:2,
          display: 'inline-flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}> 
        <Typography variant="h5" color="white">Inactive <UsersIcon></UsersIcon>: {inactiveUsers}</Typography>
      </Box>
      <Box sx={{ mb: 2, float: 'right' }}>
        <Link href={route('users.create')}>
          <Button variant="contained" color="primary"><UserAddIcon></UserAddIcon>  Create User</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role?.name}</TableCell>
                <TableCell>
                  <Link href={route('users.edit', user.id)}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Edit</Button>
                  </Link>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(user.id)}
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