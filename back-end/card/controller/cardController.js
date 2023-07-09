const cardService = require('../service/cardService');

exports.listCreditCardByUserId = (req, res) => {
  const idUsuario = req.params.idUsuario

  cardService.listCreditCardByUserId(idUsuario)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.addCreditCardForUser = async (req, res) => {
  const idUsuario = req.params.idUsuario
  const { numero, nome, codigo, validade } = req.body

  cardService.addCreditCardForUser(numero, nome, codigo, validade, idUsuario)
    .then(() => {
      res.status(200).send({ message: 'Cartão de Crédito cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.editCreditCardById = (req, res) => {
  const { numero, nome, codigo, validade } = req.body
  const { idCartao } = req.params

  cardService.editCreditCardById(numero, nome, codigo, validade, idCartao)
    .then(() => {
      res.status(200).send({ message: 'Cartão de Crédito alterado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.deleteCreditCardById = (req, res) => {
  const idCartao = req.params.idCartao;

  cardService.deleteCreditCardById(idCartao)
    .then(() => {
      res.status(200).send({ message: 'Cartão de Crédito removido com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};