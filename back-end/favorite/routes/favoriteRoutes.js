const express = require('express');
const favoriteController = require('../controller/favoriteController');

const router = express.Router();

router.get('/:idUsuario', favoriteController.listFavoritesProducts);
router.delete('/:idFavorito', favoriteController.deleteFavoriteProductById);

module.exports = router;
