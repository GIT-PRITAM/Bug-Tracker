const issueModel = require('../models/issueModel');

// Create a new issue
exports.createIssue = async (req, res) => {
    const {
        title,
        description,
        status = 'open',
        priority = 'medium',
        project_id,
        assigned_to = null
    } = req.body;

    const reported_by = req.user.id;

    if (!title || !project_id) {
        return res.status(400).json({ msg: 'Title and project ID are required' });
    }

    try {
        const issueId = await issueModel.createIssue({
            title,
            description,
            status,
            priority,
            project_id,
            reported_by,
            assigned_to
        });

        const issue = await issueModel.getIssueById(issueId);
        res.status(201).json(issue);
    } catch (err) {
        console.error("Issue creation failed:", err);
        res.status(500).json({ msg: 'Failed to create issue' });
    }
};

// Get all issues for a project
exports.getIssuesByProject = async (req, res) => {
    const { projectId } = req.params;

    try {
        const issues = await issueModel.getIssuesByProject(projectId);
        res.json(issues);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Failed to fetch issues' });
    }
};
