import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Link,
    IconButton,
    Tooltip
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <Container maxWidth="sm">



            <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Login
                </Typography>

                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
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

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        Login
                    </Button>

                    <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                        Don't have an account?{' '}
                        <Link component={RouterLink} to="/register" underline="hover">
                            Register
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;

