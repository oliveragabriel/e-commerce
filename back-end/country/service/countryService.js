const database = require('../../database');
const countryQueries = require('./sql/countryQueries');

exports.listAllCountries = () => {
  return database.query(countryQueries.listAllCountriesQuery)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
