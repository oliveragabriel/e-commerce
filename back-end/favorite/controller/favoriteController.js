const favoriteService = require('../service/favoriteService');

exports.listFavoriteProductsByUserId = (req, res) => {
  const idUsuario = req.params.idUsuario

  favoriteService.listFavoriteProductsByUserId(idUsuario)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.addProductAsFavorite = async (req, res) => {
  const { params } = req

  favoriteService.addProductAsFavorite(params)
    .then(() => {
      res.status(200).send({ message: 'Produto cadastrado como favorito com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.deleteProductFromFavoriteListById = (req, res) => {
  const idFavorito = req.params.idFavorito;

  favoriteService.deleteProductFromFavoriteListById(idFavorito)
    .then(() => {
      res.status(200).send({ message: 'Produto removido da lista de favoritos com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};