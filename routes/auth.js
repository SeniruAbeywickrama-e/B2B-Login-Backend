const express = require('express');
const UserController = require('../controller/UserController');
const RegisterController = require('../controller/RegisterController');
const router = express.Router();


router.post('/login' , UserController.login);
router.get('/verify' , UserController.verify);
router.post('/signup' , UserController.signup);

router.post('/register-investor', RegisterController.registerInvestor);
router.post('/register-company', RegisterController.registerCompany);



module.exports = router;
