const database = require('../database');

exports.listAllCountries = () => {
  const query = 'SELECT * FROM pais';
  return database.query(query)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
