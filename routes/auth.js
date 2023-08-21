const express = require('express');
const UserController = require('../controller/UserController');
const router = express.Router();


router.post('/login' , UserController.login);
router.get('/verify' , UserController.verify);
router.post('/signup' , UserController.signup);



module.exports = router;
