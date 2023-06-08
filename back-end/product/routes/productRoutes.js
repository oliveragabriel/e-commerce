const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/list-type', productController.listProductTypes);
router.get('/:idProduto', productController.getProductById);
router.post('/', productController.postAddNewProduct); //TODO
router.put('/:idProduto', productController.putEditProductById); //TODO
router.delete('/:idProduto', productController.deleteProductById); //TODO

module.exports = router;
