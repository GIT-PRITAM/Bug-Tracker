import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    MenuItem,
    Button,
    Paper,
    Card,
    CardContent,
    Box,
    Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Issues = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [issues, setIssues] = useState([]);
    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium',
        assigned_to: '',
    });

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/projects`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProjects(res.data);
        } catch (err) {
            console.error('Failed to fetch projects:', err);
        }
    };

    const fetchIssues = async (projectId) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/issues/${projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIssues(res.data);
        } catch (err) {
            console.error('Failed to fetch issues:', err);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/issues`,
                { ...form, project_id: selectedProjectId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setForm({
                title: '',
                description: '',
                status: 'open',
                priority: 'medium',
                assigned_to: '',
            });
            fetchIssues(selectedProjectId);
        } catch (err) {
            alert('Issue creation failed');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    useEffect(() => {
        if (selectedProjectId) {
            fetchIssues(selectedProjectId);
        }
    }, [selectedProjectId]);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" color="primary">
                    Issue Tracker
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => navigate('/projects')}>
                        Projects
                    </Button>
                    <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                        Dashboard
                    </Button>
                </Stack>
            </Box>



            <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
                <TextField
                    select
                    label="Select Project"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    fullWidth
                    required
                >
                    {projects.map((project) => (
                        <MenuItem key={project.id} value={project.id}>
                            {project.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Paper>

            {selectedProjectId && (
                <>

                    <Box sx={{ mb: 6 }}>
                        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                            All Issues for Project #{selectedProjectId}
                        </Typography>
                        <Box sx={{ maxHeight: '50vh', overflowY: 'auto', pr: 1 }}>
                            <Stack spacing={2}>
                                {issues.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">
                                        No issues found for this project.
                                    </Typography>
                                ) : (
                                    issues.map((issue) => (
                                        <Card key={issue.id} variant="outlined">
                                            <CardContent>
                                                <Typography variant="h6">{issue.title}</Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    {issue.description}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Status:</strong> {issue.status} | <strong>Priority:</strong>{' '}
                                                    {issue.priority}
                                                </Typography>
                                                <Typography variant="body2">
                                                    <strong>Assigned to:</strong>{' '}
                                                    {issue.assigned_to_name || 'Unassigned'}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </Stack>
                        </Box>
                    </Box>

                    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            Create New Issue
                        </Typography>

                        <Box component="form" onSubmit={handleCreate} sx={{ mt: 2 }}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Title"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    label="Description"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                                <TextField
                                    select
                                    label="Priority"
                                    value={form.priority}
                                    onChange={(e) => setForm({ ...form, priority: e.target.value })}
                                    fullWidth
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </TextField>

                                <TextField
                                    select
                                    label="Status"
                                    value={form.status}
                                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                                    fullWidth
                                >
                                    <MenuItem value="open">Open</MenuItem>
                                    <MenuItem value="in_progress">In Progress</MenuItem>
                                    <MenuItem value="closed">Closed</MenuItem>
                                </TextField>

                                <TextField
                                    label="Assign to User ID"
                                    type="number"
                                    value={form.assigned_to}
                                    onChange={(e) => setForm({ ...form, assigned_to: e.target.value })}
                                    fullWidth
                                />
                                <Button variant="contained" type="submit" color="primary">
                                    Create Issue
                                </Button>
                            </Stack>
                        </Box>
                    </Paper>
                </>
            )}
        </Container>
    );
};

export default Issues;
