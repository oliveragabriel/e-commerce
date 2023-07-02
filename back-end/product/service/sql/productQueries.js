exports.listAllTypesQuery = 'SELECT * FROM tipo';

exports.getAllProductsQuery = 'SELECT * FROM produto';

exports.getProductsByUserId = 'SELECT p.id, p.nome as "produto", p.valor, p.descricao, t.nome as "tipo", p.foto, p.banner FROM produto p LEFT JOIN tipo t ON t.id = p.tipo WHERE vendedor = $1'

exports.getProductByIdQuery = 'SELECT * FROM produto WHERE id = $1';

exports.putEditProductByIdQuery = 'UPDATE produto SET nome = $1, descricao = $2, tipo = $3, valor = $4 WHERE id_produto = $8;'

exports.deleteProductByIdQuery = 'DELETE FROM produto WHERE id = $1';

exports.getProductsFilteredByNameQuery = 'SELECT * FROM produto WHERE nome LIKE $1'

exports.getProductsFilteredByTypeQuery = 'SELECT * FROM produto WHERE tipo = $1'