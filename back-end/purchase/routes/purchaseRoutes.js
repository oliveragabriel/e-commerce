const express = require('express');
const purchaseController = require('../controller/purchaseController');

const router = express.Router();

router.get('/:idUsuario', purchaseController.listPurchaseByUserId);
router.post('/:idUsuario', purchaseController.postAddNewPurchase); 

module.exports = router;
