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

exports.postAddNewProduct = async (nome, descricao, tipo, valor, idUsuario) => {
  const values = [nome, descricao, tipo, valor, idUsuario];
  return await database.query(userQueries.postAddNewUserQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.putEditProductById = async (nome, descricao, tipo, valor, idProduto) => {
  const values = [nome, descricao, tipo, valor, idProduto];
  return await database.query(userQueries.putEditUserByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.deleteProductById = async (idProduto) => {
  const values = [idProduto];
  return await database.query(userQueries.deleteUserByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};