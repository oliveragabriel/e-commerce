const userService = require('../../services/user/userService');

exports.getUserById = (req, res) => {
  const userId = req.params.idUsuario;

  userService.getUserById(userId)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.getUserContact = (req, res) => {
  const userId = req.params.idUsuario;

  userService.getUserContact(userId)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.getUserAddress = (req, res) => {
  const userId = req.params.idUsuario;

  userService.getUserAddress(userId)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
