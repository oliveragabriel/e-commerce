const database = require('../database');

exports.listAllAssignments = () => {
  const query = 'SELECT * FROM atribuicao';
  return database.query(query)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
