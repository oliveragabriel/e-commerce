const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/list-assignment', userController.listUserAssignments);

router.get('/:idUsuario', userController.getUserById);
router.post('/', userController.postAddNewUser);
router.put('/:idUsuario', userController.putEditUserById);
router.delete('/:idUsuario', userController.deleteUserById);

router.get('/:idUsuario/contact', userController.getUserContact);
router.post('/:idUsuario/contact', userController.postAddNewContact);
router.put('/:idUsuario/contact/:idContato', userController.putEditContactById);
router.delete('/:idUsuario/contact/:idContato', userController.deleteContactById);

router.get('/:idUsuario/address', userController.getUserAddress);
router.post('/:idUsuario/address', userController.postAddNewAddress);
router.put('/:idUsuario/address/:idEndereco', userController.putEditAddressById);
router.delete('/:idUsuario/address/:idEndereco', userController.deleteAddressById);

module.exports = router;
