const projectModel = require('../models/projectModel');

// Create a new project
exports.createProject = async (req, res) => {
    const { name, description } = req.body;
    const created_by = req.user.id;

    if (!name) {
        return res.status(400).json({ msg: 'Project name is required' });
    }

    try {
        const projectId = await projectModel.createProject(name, description, created_by);
        const project = await projectModel.getProjectById(projectId);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to create project' });
    }
};

// Get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await projectModel.getAllProjects();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch projects' });
    }
};
