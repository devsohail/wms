// File: resources/js/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install and import axios

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const checkSession = async () => {
        try {
            const response = await axios.get('/api/check-session'); // Adjust this endpoint as needed
            return response.data.isValid;
        } catch (error) {
            console.error('Session check failed:', error);
            return false;
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            const loggedIn = localStorage.getItem('isAuthenticated') === 'true';
            if (loggedIn) {
                const sessionValid = await checkSession();
                if (sessionValid) {
                    const userData = JSON.parse(localStorage.getItem('user'));
                    setIsAuthenticated(true);
                    setUser(userData);
                } else {
                    // Session expired, clear local storage
                    logout();
                }
            }
        };

        initAuth();
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
