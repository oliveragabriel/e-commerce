const database = require('../../database');
const purchaseQueries = require('./sql/purchaseQueries');

exports.listPurchaseByUserId = (idUsuario) => {
  const values = [idUsuario];

  return database.query(purchaseQueries.listPurchaseByUserId, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewPurchase = async (idProduto, idVendedor, idUsuario, valor) => {
  const values = [idProduto, idVendedor, idUsuario, valor];
  return await database.query(userQueries.postAddNewPurchase, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};