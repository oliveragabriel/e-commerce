const productService = require('../service/productService');

exports.listProductTypes = (_, res) => {
    productService.listAllTypes()
      .then((result) => {
        res.status(200).send({ result });
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  };

exports.getProductById = (req, res) => {
  const idProduto = req.params.idProduto;

  productService.getProductById(idProduto)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
