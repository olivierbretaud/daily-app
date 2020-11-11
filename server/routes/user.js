const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/usersController')

router.post('/register', usersController.register );
router.post('/login', usersController.login);
router.post('/forgot', usersController.sendResetPassordEmail );
router.post('/reset-password', usersController.resetPassword );
router.get('/profile', passport.authenticate('jwt', {session: false}), usersController.profile );

module.exports = router;