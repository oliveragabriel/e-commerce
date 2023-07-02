const database = require('../../database');
const favoriteQueries = require('./sql/favoriteQueries');

exports.listFavoriteProductsByUserId = async (idUsuario) => {
  return database.query(favoriteQueries.listFavoriteProductsByUserId, [idUsuario])
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}

exports.addProductAsFavorite = async (params) => {
  const { idProduto, idUsuario } = params
  const values = [idProduto, idUsuario]

  return await database.query(favoriteQueries.addProductAsFavorite, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}

exports.deleteProductFromFavoriteListById = async (idFavorito) => {
  const values = [idFavorito]

  return await database.query(favoriteQueries.deleteProductFromFavoriteListById, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}