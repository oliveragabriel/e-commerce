const database = require('../../database');
const stateQueries = require('./sql/stateQueries');

exports.listAllStates = () => {
  return database.query(stateQueries.listAllStatesQuery)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
