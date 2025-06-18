-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('Pritam', 'pritam@gmail.com', '$2b$10$7rEjhHqCZ/BvVQguZqTVguzn3XKZgNqxzMmy0H9LfOqBGRSp8rwye', 'admin'),
('Neha', 'neha@gmail.com', '$2b$10$5w3ez.kFcFREjxuYfefdxOvWnsAFkYHE0VffEu9djMYIm0hx2ylri', 'developer');

-- Insert sample projects
INSERT INTO projects (name, description, created_by) VALUES
('BugTracker v1', 'Initial bug tracking system setup', 1),
('Internal Tool', 'Internal dashboard for team metrics', 2);

-- Insert sample issues
INSERT INTO issues (title, description, status, priority, project_id, reported_by, assigned_to) VALUES
('Login fails on wrong password', 'Should show message but crashes', 'open', 'high', 1, 1, 2),
('Unable to create project', 'Project form not submitting', 'in_progress', 'medium', 1, 1, 2),
('Broken link on dashboard', 'Metrics page link is 404', 'closed', 'low', 2, 2, 1),
('User role not updating', 'Admin can’t update role in UI', 'open', 'high', 2, 2, NULL);
