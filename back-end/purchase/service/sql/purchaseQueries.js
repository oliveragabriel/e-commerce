exports.listPurchaseByUserId = 'SELECT * FROM compras WHERE comprador = $1';

exports.postAddNewPurchase = 'INSERT INTO compras( produto, vendedor, comprador, valor) VALUES ( $1, $2, $3, $4 );';