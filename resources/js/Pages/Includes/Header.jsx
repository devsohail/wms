// File: resources/js/components/Header.jsx

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logo from '../includes/Logo';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        try {
            await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                },
            });

            logout();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Logo />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 2 }}>
                    WMS
                </Typography>
                {user && (
                    <>
                        <Typography variant="body1" component="div" sx={{ marginRight: 2 }}>
                            Welcome {user.name}
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose} component="a" href="/profile">Profile</MenuItem>
                            <MenuItem onClick={handleClose} component="a" href="/change-password">Change Password</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;
