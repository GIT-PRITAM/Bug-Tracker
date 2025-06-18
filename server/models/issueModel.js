const db = require('../config/db');

// Create a new issue
exports.createIssue = async (data) => {
    const {
        title,
        description,
        status,
        priority,
        project_id,
        reported_by,
        assigned_to
    } = data;

    const [result] = await db.query(
        'INSERT INTO issues (title, description, status, priority, project_id, reported_by, assigned_to) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, description, status, priority, project_id, reported_by, assigned_to]
    );
    return result.insertId;
};

// Get all issues for a project
exports.getIssuesByProject = async (projectId) => {
    const [rows] = await db.query(
        `SELECT i.*, 
            ru.name AS reported_by_name, 
            au.name AS assigned_to_name 
     FROM issues i
     LEFT JOIN users ru ON i.reported_by = ru.id
     LEFT JOIN users au ON i.assigned_to = au.id
     WHERE i.project_id = ?`,
        [projectId]
    );

    return rows;
};

// Get issue by ID
exports.getIssueById = async (issueId) => {
    const [rows] = await db.query('SELECT * FROM issues WHERE id = ?', [issueId]);
    return rows[0];
};
