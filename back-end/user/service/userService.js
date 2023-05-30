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

exports.getUserContact = (idUsuario) => {
  const values = [idUsuario];
  return database.query(userQueries.getUserContactQuery, values)
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
