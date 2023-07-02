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

exports.getAllProducts = (_, res) => {
  productService.getAllProducts()
    .then((result) => {
      res.status(200).send(result);
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

exports.postAddNewProduct = async (req, res) => {
  const { body } = req

  productService.postAddNewProduct(body)
    .then(() => {
      res.status(200).send({ message: 'Produto cadastrado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.putEditProductById = (req, res) => {
  const { nome, descricao, tipo, valor } = req.body
  const { idProduto } = req.params

  productService.putEditProductById(nome, descricao, tipo, valor, idProduto)
    .then(() => {
      res.status(200).send({ message: 'Produto alterado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.deleteProductById = (req, res) => {
  const idProduto = req.params.idProduto;

  productService.deleteProductById(idProduto)
    .then(() => {
      res.status(200).send({ message: 'Produto deletado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.getProductsFilteredByType  = (req, res) => {
  const idTipo = req.params.idTipo;

  productService.getProductsFilteredByType(idTipo)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};

exports.getProductsFilteredByName = (req, res) => {
  const { nome } = req.body
  const nomeProduto = `%${nome}%`

  productService.getProductsFilteredByName(nomeProduto)
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};