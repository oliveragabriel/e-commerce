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

exports.postAddNewUser = (req, res) => {
  const { nome, sobrenome, atribuicao, senha } = req.body

  userService.postAddNewUser(nome, sobrenome, atribuicao, senha)
    .then(() => {
      res.status(200).send({ message: 'Usuário cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.deleteUserById = (req, res) => {
  const idUsuario = req.params.idUsuario;

  userService.deleteUserById(idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Usuário deletado com sucesso!' });
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

exports.postAddNewContact = (req, res) => {
  const { ddd, numero, email, idUsuario } = req.body

  userService.postAddNewContact(ddd, numero, email, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Contato cadastrado com sucesso!' });
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
