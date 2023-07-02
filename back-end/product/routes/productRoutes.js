const express = require('express');
const productController = require('../controller/productController');

const router = express.Router();

router.get('/categoria', productController.listProductTypes);
router.get('/', productController.getAllProducts);
router.get('/usuario/:idUsuario', productController.getProductsByUserId);
router.get('/:idProduto', productController.getProductById);
router.post('/', productController.postAddNewProduct);
router.put('/:idProduto', productController.putEditProductById);
router.delete('/:idProduto', productController.deleteProductById);
router.get('/categoria/:idTipo', productController.getProductsFilteredByType);
router.get('/nome', productController.getProductsFilteredByName);

module.exports = router;
