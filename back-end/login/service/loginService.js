const database = require('../../database');
const loginQueries = require('./sql/loginQueries');

exports.validateUserToLogin = (idUsuario, senha) => {
  const values = [idUsuario, senha]
  return database.query(loginQueries.validateUserToLoginQuery, values)
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};
