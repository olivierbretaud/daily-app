const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/usersController')

router.post('/register', usersController.register );

router.post('/login', usersController.login);

router.get('/me', passport.authenticate('jwt', {session: false}), usersController.me );

module.exports = router;