const database = require('../database');

exports.listAllStates = () => {
  const query = 'SELECT * FROM estado';
  return database.query(query)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
