const favoriteService = require('../service/favoriteService');

exports.listFavoritesProducts = (req, res) => {
  const idUsuario = req.params.idUsuario
  favoriteService.listFavoritesProducts(idUsuario)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.deleteFavoriteProductById = (req, res) => {
  const idFavorito = req.params.idFavorito;

  favoriteService.deleteFavoriteProductById(idFavorito)
    .then(() => {
      res.status(200).send({ message: 'Produto removido da lista de favoritos com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};