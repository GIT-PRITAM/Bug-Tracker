const express = require('express');
const issueController = require('../controllers/issueController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth, issueController.createIssue);
router.get('/:projectId', auth, issueController.getIssuesByProject);

module.exports = router;
