const express = require('express');
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, projectController.createProject);
router.get('/', auth, projectController.getAllProjects);

module.exports = router;
