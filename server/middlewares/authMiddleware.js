const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Authorization token missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
