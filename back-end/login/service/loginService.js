const database = require('../../database');
const loginQueries = require('./sql/loginQueries');

exports.validateUserToLogin = (login, senha) => {
  const values = [login, senha]
  return database.query(loginQueries.validateUserToLoginQuery, values)
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};
