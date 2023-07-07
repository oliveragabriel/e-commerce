const database = require('../../database');
const productQueries = require('./sql/productQueries');

exports.listAllTypes = () => {
  return database.query(productQueries.listAllTypesQuery)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
}

exports.getProductsToShowAsBanner = () => {
  return database.query(productQueries.getProductsToShowAsBanner)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    })
}

exports.getAllProducts = () => {
  return database.query(productQueries.getAllProductsQuery)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    })
}

exports.getProductsByUserId = (idUsuario) => {
  const values = [idUsuario]

  return database.query(productQueries.getProductsByUserId, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}

exports.getProductById = (idProduto) => {
  const values = [idProduto];

  return database.query(productQueries.getProductByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewProduct = async (body) => {
  const { nome, descricao, categoria, valor, banner, deveMostrarBanner, foto, idUsuario } = body
  const sqlColumnBanner = banner === '' ? '' : ', banner'
  const sqlColumnFoto = foto === '' ? '' : ', foto'
  const sqlValueBanner = banner === '' ? '' : `, '${banner}'`
  const sqlValueFoto = foto === '' ? '' : `, '${foto}'`
  const sqlFinal = `INSERT INTO produto( nome, descricao, tipo, valor, vendedor, deveMostrarBanner ${sqlColumnFoto} ${sqlColumnBanner} ) VALUES ( '${nome}', '${descricao}', ${categoria}, ${valor}, ${idUsuario}, ${deveMostrarBanner} ${sqlValueFoto} ${sqlValueBanner} );`
  return await database.query(sqlFinal)
    .then((result) => result.rows)
    .catch((error) => {
      throw error
    })
}

exports.putEditProductById = async (nome, descricao, categoria, valor, banner, devemostrarbanner, foto, idProduto) => {
  const values = [nome, descricao, categoria, valor, banner, devemostrarbanner, foto, idProduto]
  const sqlColumnBanner = banner ? `, banner = '${banner}'` : ''
  const sqlFinal = `UPDATE produto SET nome = '${nome}', descricao = '${descricao}', tipo = ${categoria}, valor = ${valor}, deveMostrarBanner = ${devemostrarbanner}, foto = '${foto}' ${sqlColumnBanner} WHERE id = ${idProduto};`
  return await database.query(sqlFinal)
  .then((result) => result.rows)
  .catch((error) => {
      console.log("🚀 ~ exports.putEditProductById= ~ error:", error)
      throw error;
    });
};

exports.deleteProductById = async (idProduto) => {
  const values = [idProduto];
  return await database.query(productQueries.deleteProductByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getProductsFilteredByType = (idTipo) => {
  const values = [idTipo];

  return database.query(productQueries.getProductsFilteredByTypeQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getProductsFilteredByName = (nomeProduto) => {
  const values = [nomeProduto];

  return database.query(productQueries.getProductsFilteredByNameQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};