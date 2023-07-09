const database = require('../../database');
const cardQueries = require('./sql/cardQueries');

exports.listCreditCardByUserId = async (idUsuario) => {
  const values = [idUsuario]

  return database.query(cardQueries.listCreditCardByUserId, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}

exports.addCreditCardForUser = async (numero, nome, codigo, validade, idUsuario) => {
  const values = [numero, nome, codigo, validade, idUsuario]

  return await database.query(cardQueries.addCreditCardForUser, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}

exports.editCreditCardById = async (numero, nome, codigo, validade, idCartao) => {
  const sqlFinal = `UPDATE cartao SET nome = '${nome}', numero = '${numero}', codigo = ${codigo}, validade = '${validade}' WHERE id = ${idCartao};`
  return await database.query(sqlFinal)
  .then((result) => result.rows)
  .catch((error) => {
      throw error;
    });
};

exports.deleteCreditCardById = async (idCartao) => {
  const values = [idCartao]

  return await database.query(cardQueries.deleteCreditCardById, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}