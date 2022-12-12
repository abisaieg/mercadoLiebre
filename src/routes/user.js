const express = require('express');
const router = express.Router();


// ************ Controller Require ************
const userController = require('../controllers/userController');

router.get('/', userController.logIn); 

module.exports = router;
