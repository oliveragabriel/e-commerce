const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/list-assignment', userController.listUserAssignments);
router.get('/:idUsuario', userController.getUserById);
router.post('/', userController.postAddNewUser);
router.delete('/:idUsuario', userController.deleteUserById);
router.get('/:idUsuario/contact', userController.getUserContact);
router.post('/:idUsuario/contact', userController.postAddNewContact);
router.get('/:idUsuario/address', userController.getUserAddress);

module.exports = router;
