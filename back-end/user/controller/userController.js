const userService = require('../service/userService');

exports.listUserAssignments = (_, res) => {
  userService.listAllAssignments()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.getUserById = (req, res) => {
  const idUsuario = req.params.idUsuario;

  userService.getUserById(idUsuario)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.getUserContact = (req, res) => {
  const idUsuario = req.params.idUsuario;

  userService.getUserContact(idUsuario)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.getUserAddress = (req, res) => {
  const idUsuario = req.params.idUsuario;

  userService.getUserAddress(idUsuario)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
