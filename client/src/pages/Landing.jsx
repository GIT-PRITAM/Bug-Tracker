import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    Button,
    Stack,
} from '@mui/material';

const Landing = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
            <Box textAlign="center" width="100%">
                <Typography variant="h2" color="primary" gutterBottom>
                    Welcome to BugTracker
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
                    Bug reporting, tracking, and resolution — all in one place.
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
};

export default Landing;
