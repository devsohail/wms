// File: resources/js/Pages/Auth/ChangePassword.jsx

import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Button, TextField, Box, Typography, Container, CssBaseline, Collapse, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../Includes/Logo';

const theme = createTheme();

const ChangePassword = () => {
    const { data, setData, post, errors, processing } = useForm({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });
    
    const [customErrors, setCustomErrors] = useState({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
    });

    const [passwordStrength, setPasswordStrength] = useState('');

    const validateForm = () => {
        let isValid = true;
        let newErrors = { current_password: '', new_password: '', new_password_confirmation: '' };

        if (!data.current_password) {
            newErrors.current_password = 'Current password is required';
            isValid = false;
        }
        if (!data.new_password) {
            newErrors.new_password = 'New password is required';
            isValid = false;
        } else {
            // Regex for strong password: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(data.new_password)) {
                newErrors.new_password = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character';
                isValid = false;
            }
        }
        if (!data.new_password_confirmation) {
            newErrors.new_password_confirmation = 'Password confirmation is required';
            isValid = false;
        } else if (data.new_password !== data.new_password_confirmation) {
            newErrors.new_password_confirmation = 'Passwords do not match';
            isValid = false;
        }

        setCustomErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        post(route('password.update'), {
            onSuccess: () => {
                alert('Password changed successfully.');
                window.location.href = route('dashboard');
            },
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);

        if (name === 'new_password') {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (passwordRegex.test(value)) {
                setPasswordStrength('Strong password');
            } else {
                setPasswordStrength('Password should be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character');
            }
        }
    };

    return (
        <>
            <Head title="Change Password" />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Logo height={60} />
                        <Typography component="h1" variant="h5">
                            Change Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="current_password"
                                label="Current Password"
                                type="password"
                                id="current_password"
                                autoComplete="current-password"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                error={!!errors.current_password || !!customErrors.current_password}
                                helperText={errors.current_password || customErrors.current_password}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="new_password"
                                label="New Password"
                                type="password"
                                id="new_password"
                                autoComplete="new-password"
                                value={data.new_password}
                                onChange={handlePasswordChange}
                                error={!!errors.new_password || !!customErrors.new_password}
                                helperText={errors.new_password || customErrors.new_password}
                            />
                            <Collapse in={passwordStrength !== ''}>
                                <Alert severity={passwordStrength === 'Strong password' ? 'success' : 'warning'}>
                                    {passwordStrength}
                                </Alert>
                            </Collapse>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="new_password_confirmation"
                                label="Confirm New Password"
                                type="password"
                                id="new_password_confirmation"
                                autoComplete="new-password-confirmation"
                                value={data.new_password_confirmation}
                                onChange={(e) => setData('new_password_confirmation', e.target.value)}
                                error={!!errors.new_password_confirmation || !!customErrors.new_password_confirmation}
                                helperText={errors.new_password_confirmation || customErrors.new_password_confirmation}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                disabled={processing}
                            >
                                Change Password
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default ChangePassword;
