const express = require('express');
const userController = require('../controller/userController');

const router = express.Router();

router.get('/atribuicao', userController.listUserAssignments);

router.get('/:idUsuario', userController.getUserById);
router.post('/', userController.postAddNewUser);
router.put('/:idUsuario', userController.putEditUserById);
router.delete('/:idUsuario', userController.deleteUserById);

router.get('/:idUsuario/contato', userController.getUserContact);
router.post('/:idUsuario/contato', userController.postAddNewContact);
router.put('/:idUsuario/contato/:idContato', userController.putEditContactById);
router.delete('/:idUsuario/contato/:idContato', userController.deleteContactById);

router.get('/:idUsuario/endereco', userController.getUserAddress);
router.post('/:idUsuario/endereco', userController.postAddNewAddress);
router.put('/:idUsuario/endereco/:idEndereco', userController.putEditAddressById);
router.delete('/:idUsuario/endereco/:idEndereco', userController.deleteAddressById);

router.put('/:idUsuario/senha', userController.putEditPasswordById);

module.exports = router;
