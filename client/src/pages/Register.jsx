import React, { useState } from 'react';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
                name,
                email,
                password,
            });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    boxShadow: 3,
                    borderRadius: 2,
                    backgroundColor: '#f9f9f9',
                }}
            >
                <Box
                    sx={{
                        borderRadius: 1,
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        Register
                    </Typography>
                </Box>

                <form onSubmit={handleRegister}>
                    <TextField
                        label="Name"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, backgroundColor: '#1976d2' }}
                    >
                        Register
                    </Button>
                </form>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box mt={2} textAlign="center">
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
