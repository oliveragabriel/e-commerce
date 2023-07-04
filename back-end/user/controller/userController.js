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
  const { nome, sobrenome, senha, email } = req.body
  const atribuicao = 2

  userService.postAddNewUser(nome, sobrenome, atribuicao, senha, email)
    .then(() => {
      res.status(200).send({ message: 'Usuário cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.putEditUserById = (req, res) => {
  const { nome, sobrenome, cpf, nacionalidade, email, telefone } = req.body
  const { idUsuario } = req.params

  userService.putEditUserById(nome, sobrenome, cpf, nacionalidade, email, telefone, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Usuário alterado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.putEditPasswordById = (req, res) => {
  const { senha } = req.body
  const { idUsuario } = req.params

  userService.putEditPasswordById(senha, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Senha alterada com sucesso!' });
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
  const { rua, numero, complemento, bairro, cidade, estado, pais } = req.body
  const { idUsuario } = req.params

  userService.postAddNewAddress(rua, numero, complemento, bairro, cidade, estado, pais, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Endereço cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.putEditAddressById = (req, res) => {
  const { rua, numero, complemento, bairro, cidade, estado, pais } = req.body
  const { idUsuario, idEndereco } = req.params

  userService.putEditAddressById(rua, numero, complemento, bairro, cidade, estado, pais, idUsuario, idEndereco)
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
