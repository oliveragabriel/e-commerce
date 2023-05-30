const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/list-type', productController.getProductById);
router.get('/:idProduto', productController.getProductById);

module.exports = router;
