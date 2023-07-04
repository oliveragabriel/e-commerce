const database = require('../../database');
const loginQueries = require('./sql/loginQueries');

exports.validateUserToLogin = (email, senha) => {
  const values = [email, senha]
  return database.query(loginQueries.validateUserToLoginQuery, values)
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};
