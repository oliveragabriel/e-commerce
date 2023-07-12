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

exports.postAddNewPurchase = async (idProduto, idVendedor, idUsuario, valor, idCartao, idEndereco) => {
  const values = [idProduto, idVendedor, idUsuario, valor];
  return await database.query(purchaseQueries.postAddNewPurchase, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};