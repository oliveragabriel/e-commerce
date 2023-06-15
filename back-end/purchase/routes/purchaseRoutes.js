const express = require('express');
const purchaseController = require('../controller/purchaseController');

const router = express.Router();

router.get('/:idUsuario', purchaseController.listPurchaseByUserId);

module.exports = router;
