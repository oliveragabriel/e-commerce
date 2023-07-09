const express = require('express');
const cardController = require('../controller/cardController');

const router = express.Router();

router.get('/:idUsuario', cardController.listCreditCardByUserId);
router.post('/:idUsuario', cardController.addCreditCardForUser);
router.put('/:idCartao', cardController.editCreditCardById);
router.delete('/:idCartao', cardController.deleteCreditCardById);

module.exports = router;
