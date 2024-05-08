const express = require('express');

const userController = require('../Controllers/user');

const router = express.Router();

router.post('/login', userController.userLogin);
router.post('/signup', userController.userSingnup);


module.exports = router;