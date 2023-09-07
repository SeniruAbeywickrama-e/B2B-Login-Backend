const express = require('express');
const UserController = require('../controller/UserController');
const RegisterController = require('../controller/RegisterController');
const InvestorController = require('../controller/InvestorController');
const router = express.Router();


router.post('/login' , UserController.login);
router.get('/verify' , UserController.verify);
router.post('/signup' , UserController.signup);
router.get('/signOut' , UserController.signOut);

router.post('/register-investor', RegisterController.registerInvestor);
router.post('/register-company', RegisterController.registerCompany);


router.get('/get-all-investors', InvestorController.getAllInvestors);
router.get('/get-investors-by-id', InvestorController.getInvestorById);
router.get('/investor/search', InvestorController.searchInvestorByName);
router.get('/investor/filter', InvestorController.investorFilter);





module.exports = router;
