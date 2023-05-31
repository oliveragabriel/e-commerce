const database = require('../../database');
const productQueries = require('./sql/productQueries');

exports.listAllTypes = () => {
  return database.query(productQueries.listAllTypes)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getProductById = (idProduto) => {
  const values = [idProduto];

  return database.query(productQueries.getProductById, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};