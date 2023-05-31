const database = require('../../database');
const userQueries = require('./sql/userQueries');

exports.listAllAssignments = () => {
  return database.query(userQueries.listAllAssignmentsQuery)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserById = (idUsuario) => {
  const values = [idUsuario];
  return database.query(userQueries.getUserByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewUser = (nome, sobrenome, atribuicao, senha) => {
  const values = [nome, sobrenome, atribuicao, senha];
  return database.query(userQueries.postAddNewUser, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.deleteUserById = (idUsuario) => {
  const values = [idUsuario];
  return database.query(userQueries.deleteUserByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserContact = (idUsuario) => {
  const values = [idUsuario];
  return database.query(userQueries.getUserContactQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewContact = (ddd, numero, email, idUsuario) => {
  const values = [ddd, numero, email, idUsuario];
  return database.query(userQueries.postAddNewUser, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserAddress = (idUsuario) => {
  const values = [idUsuario];
  return database.query(userQueries.getUserAddressQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
