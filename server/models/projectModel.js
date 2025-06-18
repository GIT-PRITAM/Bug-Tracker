const db = require('../config/db');

// Create a new project
exports.createProject = async (name, description, createdBy) => {
    const [result] = await db.query(
        'INSERT INTO projects (name, description, created_by) VALUES (?, ?, ?)',
        [name, description, createdBy]
    );
    return result.insertId;
};

// Get all projects
exports.getAllProjects = async () => {
    const [rows] = await db.query(
        'SELECT p.*, u.name as creator_name FROM projects p JOIN users u ON p.created_by = u.id'
    );
    return rows;
};

// Get project by ID
exports.getProjectById = async (projectId) => {
    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [projectId]);
    return rows[0];
};
