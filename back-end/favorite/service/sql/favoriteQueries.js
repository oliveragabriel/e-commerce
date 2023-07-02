exports.listFavoriteProductsByUserId = 'SELECT f.id, p.nome as "produto", p.descricao, t.nome as "tipo", p.valor FROM favoritos f LEFT JOIN produto p ON p.id = f.id_produto LEFT JOIN tipo t ON t.id = p.tipo WHERE f.id_usuario = $1';

exports.addProductAsFavorite = 'INSERT INTO favoritos( id_produto, id_usuario) VALUES ( $1, $2 );';

exports.deleteProductFromFavoriteListById = 'DELETE FROM favoritos WHERE id = $1';