const express = require('express');
const router = express.Router();
const passport = require('passport');

const tasksController = require('../controllers/tasksController')

router.post('/create', passport.authenticate('jwt', {session: false}), tasksController.create );
router.get('/:user', passport.authenticate('jwt', {session: false}), tasksController.findUserTasks );
router.put('/update/:id' , passport.authenticate('jwt', {session: false}), tasksController.update );
router.delete('/delete/:id' , passport.authenticate('jwt', {session: false}), tasksController.delete );

module.exports = router;