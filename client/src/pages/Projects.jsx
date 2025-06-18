import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ name: '', description: '' });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects(res.data);
        } catch (err) {
            console.error('Failed to fetch projects:', err.response?.data);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/projects`, form, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setForm({ name: '', description: '' });
            fetchProjects();
        } catch (err) {
            alert('Project creation failed');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 6 }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary">
                    Projects
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => navigate('/issues')}>
                        Go to Issues
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </Button>
                </Stack>
            </Box>

            <Box component="form" onSubmit={handleCreate} sx={{ mb: 4 }}>
                <TextField
                    label="Project Name"
                    fullWidth
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    margin="normal"
                    required
                />
                <TextField
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                    color="primary"
                >
                    Create Project
                </Button>
            </Box>

            <Stack spacing={2}>
                {projects.map((project) => (
                    <Card key={project.id} variant="outlined" sx={{ width: '100%' }}>
                        <CardContent>
                            <Typography variant="h6">{project.name}</Typography>
                            <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
                                {project.description}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Created by: {project.creator_name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default Projects;

