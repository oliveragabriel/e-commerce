const countryService = require('../services/paisService');

exports.listCountry = (_, res) => {
  countryService.listAllCountries()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
