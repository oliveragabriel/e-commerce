const purchaseService = require('../service/purchaseService');

exports.listPurchaseByUserId = (req, res) => {
  const idUsuario = req.params.idUsuario;

  purchaseService.listPurchaseByUserId(idUsuario)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.postAddNewPurchase = (req, res) => {
  const idUsuario = req.params.idUsuario;
  const { idProduto, idVendedor, valor, idCartao, idEndereco } = req.body

  purchaseService.postAddNewPurchase(idProduto, idVendedor, idUsuario, valor, idCartao, idEndereco)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};