const express = require('express');
const favoriteController = require('../controller/favoriteController');

const router = express.Router();

router.get('/:idUsuario', favoriteController.listFavoriteProductsByUserId);
router.post('/:idProduto/usuario/:idUsuario', favoriteController.addProductAsFavorite);
router.delete('/:idFavorito', favoriteController.deleteProductFromFavoriteListById);

module.exports = router;
