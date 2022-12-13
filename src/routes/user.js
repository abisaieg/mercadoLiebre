const express = require('express');
const app = require('../app');
const router = express.Router();


// ************ Controller Require ************
const userController = require('../controllers/userController');

router.get('/', userController.logIn); 
router.post('/user ', userController.validacionDeDatos); 


module.exports = router;

