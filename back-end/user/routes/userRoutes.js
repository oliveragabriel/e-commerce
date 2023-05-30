const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/list-assignment', userController.listUserAssignments);
router.get('/:idUsuario', userController.getUserById);
router.get('/:idUsuario/contact', userController.getUserContact);
router.get('/:idUsuario/address', userController.getUserAddress);

module.exports = router;
