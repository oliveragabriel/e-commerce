const stateService = require('../service/stateService');

exports.listState = (_, res) => {
  stateService.listAllStates()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
