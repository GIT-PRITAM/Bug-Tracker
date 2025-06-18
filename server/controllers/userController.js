const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Register a new user
exports.registerUser = async (req, res) => {
    const { name, email, password, role = 'reporter' } = req.body;

    try {
        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await userModel.createUser(name, email, hashedPassword, role);
        const user = await userModel.findUserById(userId);

        res.status(201).json({
            msg: 'User registered successfully',
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

// Login user and return JWT
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findUserByEmail(email);
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};
