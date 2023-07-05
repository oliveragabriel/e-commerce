exports.listPurchaseByUserId = 'SELECT c.id, c.valor, p.nome, p.descricao, t.nome as "tipo", p.foto FROM compras c LEFT JOIN produto p ON c.produto = p.id LEFT JOIN tipo t ON t.id = p.tipo WHERE c.comprador = $1';

exports.postAddNewPurchase = 'INSERT INTO compras( produto, vendedor, comprador, valor) VALUES ( $1, $2, $3, $4 );';