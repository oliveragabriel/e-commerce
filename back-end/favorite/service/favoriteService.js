const database = require('../../database');
const favoriteQueries = require('./sql/favoriteQueries');

exports.listFavoritesProducts = (idUsuario) => {
  return database.query(favoriteQueries.listFavoritesProducts, [idUsuario])
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.deleteFavoriteProductById = async (idFavorito) => {
  const values = [idFavorito];
  return await database.query(favoriteQueries.deleteFavoriteProductById, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};