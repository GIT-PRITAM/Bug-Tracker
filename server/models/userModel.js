const db = require('../config/db');

// Register new user
exports.createUser = async (name, email, hashedPassword, role = 'reporter') => {
    const [result] = await db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role]
    );
    return result.insertId;
};

// Get user by email for login
exports.findUserByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

// Get user by ID
exports.findUserById = async (id) => {
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
};
