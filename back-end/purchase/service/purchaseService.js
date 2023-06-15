const database = require('../../database');
const purchaseQueries = require('./sql/purchaseQueries');

exports.listPurchaseByUserId = () => {
  const values = [idUsuario];

  return database.query(purchaseQueries.listPurchaseByUserId, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
