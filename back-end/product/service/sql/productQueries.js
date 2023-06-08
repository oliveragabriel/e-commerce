exports.listAllTypesQuery = 'SELECT * FROM tipo';

exports.getProductByIdQuery = 'SELECT * FROM produto WHERE id = $1';

exports.postAddNewProductQuery = 'INSERT INTO produto( nome, descricao, tipo, valor, id_usuario) VALUES ( $1, $2, $3, $4, $5 );'

exports.putEditProductByIdQuery = 'UPDATE produto SET nome = $1, descricao = $2, tipo = $3, valor = $4 WHERE id_produto = $8;'

exports.deleteProductByIdQuery = 'DELETE FROM produto WHERE id = $1';