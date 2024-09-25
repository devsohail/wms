import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { TextField, Button, Box, Typography } from '@mui/material';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { showErrorToast } from '@/Utils/toast';

const Create = ({flash}) => {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    file: null,
  });
  useEffect(() => {
    if (flash?.error) {
      showErrorToast(flash.error);
    }
  }, [flash]);

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('documents.store'));
  };

  return (
    <AuthenticatedLayout title="Upload Document">
      <Typography variant="h4" gutterBottom>
        Upload Document
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mt: 3 }}>
        <TextField
          fullWidth
          label="Title"
          value={data.title}
          onChange={e => setData('title', e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          onChange={e => setData('file', e.target.files[0])}
        />
        {errors.file && <Typography color="error">{errors.file}</Typography>}
        <Button type="submit" variant="contained" color="primary" disabled={processing} sx={{ mt: 2 }}>
          Upload
        </Button>
      </Box>
    </AuthenticatedLayout>
  );
};

export default Create;