const express = require('express');
const loginController = require('../controller/loginController');

const router = express.Router();

router.get('/:idUsuario', loginController.validateUserToLogin);

module.exports = router;
