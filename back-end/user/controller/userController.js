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
  const { nome, sobrenome, senha, login } = req.body
  const atribuicao = 2

  userService.postAddNewUser(nome, sobrenome, atribuicao, senha, login)
    .then(() => {
      res.status(200).send({ message: 'Usuário cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.putEditUserById = (req, res) => {
  const { nome, sobrenome, cpf, nacionalidade, email, telefone, hasContato, login } = req.body
  const { idUsuario } = req.params

  userService.putEditUserById(nome, sobrenome, cpf, nacionalidade, email, telefone, idUsuario, hasContato, login)
    .then(() => {
      res.status(200).send({ message: 'Usuário alterado com sucesso!' });
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
  const { ddd, numero, email } = req.body
  const { idUsuario } = req.params

  userService.postAddNewContact(ddd, numero, email, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Contato cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.putEditContactById = (req, res) => {
  const { ddd, numero, email } = req.body
  const { idUsuario } = req.params

  userService.putEditUserById(ddd, numero, email, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Contato alterado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.deleteContactById = (req, res) => {
  const idContato = req.params.idContato;

  userService.deleteContactById(idContato)
    .then(() => {
      res.status(200).send({ message: 'Contato deletado com sucesso!' });
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

exports.postAddNewAddress = (req, res) => {
  const { rua, numero, complemento, bairro, cidade, idEstado, idPais } = req.body
  const { idUsuario } = req.params

  userService.postAddNewAddress(rua, numero, complemento, bairro, cidade, idEstado, idPais, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Endereço cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.putEditAddressById = (req, res) => {
  const { rua, numero, complemento, bairro, cidade, idEstado, idPais } = req.body
  const { idUsuario } = req.params

  userService.putEditAddressById(rua, numero, complemento, bairro, cidade, idEstado, idPais, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Endereço alterado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.deleteAddressById = (req, res) => {
  const idEndereco = req.params.idEndereco;

  userService.deleteAddressById(idEndereco)
    .then(() => {
      res.status(200).send({ message: 'Endereço deletado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
