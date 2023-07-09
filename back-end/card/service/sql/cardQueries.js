exports.listCreditCardByUserId = 'SELECT * FROM cartao WHERE id_usuario = $1';

exports.addCreditCardForUser = 'INSERT INTO cartao( nome, validade, codigo, numero, id_usuario) VALUES ( $2, $4, $3, $1, $5 );';

exports.deleteCreditCardById = 'DELETE FROM cartao WHERE id = $1';