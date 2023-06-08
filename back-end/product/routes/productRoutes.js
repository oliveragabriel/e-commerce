const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/list-type', productController.listProductTypes);
router.get('/:idProduto', productController.getProductById);
router.post('/', productController.postAddNewProduct);
router.put('/:idProduto', productController.putEditProductById);
router.delete('/:idProduto', productController.deleteProductById);

module.exports = router;
