import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Stack,
    Paper
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderIcon from '@mui/icons-material/Folder';
import BugReportIcon from '@mui/icons-material/BugReport';

const Dashboard = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const userFromToken = localStorage.getItem('user');
        if (userFromToken) {
            setUser(JSON.parse(userFromToken));
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleProjectsClick = () => {
        navigate('/projects');
    };

    const handleIssuesClick = () => {
        navigate('/issues');
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                backgroundColor: '#f5f7fa',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2,
            }}
        >
            <Container maxWidth="md">
                <Paper elevation={4} sx={{ p: 6, borderRadius: 4 }}>
                    <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
                        Welcome, {user?.name || 'User'}
                    </Typography>

                    <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
                        Role: {user?.role || 'N/A'}
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={3}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ mt: 5, flexWrap: 'wrap' }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<FolderIcon />}
                            onClick={handleProjectsClick}
                            sx={{ minWidth: 200 }}
                        >
                            Go to Projects
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            startIcon={<BugReportIcon />}
                            onClick={handleIssuesClick}
                            sx={{ minWidth: 200 }}
                        >
                            Go to Issues
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            size="large"
                            startIcon={<LogoutIcon />}
                            onClick={handleLogout}
                            sx={{ minWidth: 200 }}
                        >
                            Logout
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};

export default Dashboard;

