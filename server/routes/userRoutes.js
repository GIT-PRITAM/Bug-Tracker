const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// router.post('/register', (req, res) => {
//     console.log(req.body);
//     res.send("Register endpoint hit!");
// });

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
