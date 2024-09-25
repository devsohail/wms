import React, { useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showSuccessToast, showErrorToast } from '@/Utils/toast';

const Index = ({ documents, auth,flash }) => {
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
    <AuthenticatedLayout title="Documents">
      <Typography variant="h4" gutterBottom>
        Documents
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Link href={route('documents.create')}>
          <Button variant="contained" color="primary">Upload Document</Button>
        </Link>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Uploaded By</TableCell>
              <TableCell>Upload Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((document) => (
              <TableRow key={document.id}>
                <TableCell>{document.title}</TableCell>
                <TableCell>{document.user.name}</TableCell>
                <TableCell>{new Date(document.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                    <a href={route('documents.download', document.id)} download>
                        <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Download</Button>
                    </a>
                  {auth.user.role_id === 1 && (
                    <>
                      <Link href={route('documents.edit', document.id)}>
                        <Button variant="outlined" color="secondary" sx={{ mr: 1 }}>Edit</Button>
                      </Link>
                      <Link href={route('documents.destroy', document.id)} method="delete" as="button" onClick={() => handleDelete(document.id)}>
                        <Button variant="outlined" color="error">Delete</Button>
                      </Link>
                    </>
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