exports.listAllAssignmentsQuery = 'SELECT * FROM atribuicao';

exports.getUserByIdQuery = 'SELECT u.id, u.nome, u.sobrenome, u.cpf, u.dt_nascimento, u.nacionalidade, u.atribuicao, c.email, c.telefone FROM usuario u LEFT JOIN contato c ON c.id_usuario = u.id WHERE u.id = $1';

exports.postAddNewUserQuery = 'INSERT INTO usuario( nome, sobrenome, atribuicao, senha) VALUES ( $1, $2, $3, $4 );';

exports.deleteUserByIdQuery = 'DELETE FROM usuario WHERE id = $1';

exports.getUserContactQuery = 'SELECT contato.ddd, contato.numero, contato.email FROM contato INNER JOIN usuario ON usuario.id = contato.id_usuario WHERE usuario.id = $1';

exports.postAddNewContactQuery = 'INSERT INTO contato( ddd, numero, email, id_usuario) VALUES ( $1, $2, $3, $4 );';

exports.putEditContactByIdQuery = 'UPDATE contato SET ddd = $1, numero = $2, email = $3 WHERE id_usuario = $4;'

exports.deleteContactByIdQuery = 'DELETE FROM contato WHERE id = $1';

exports.getUserAddressQuery = 'SELECT endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, estado.nome, estado.sigla, pais.nome, pais.sigla FROM endereco INNER JOIN usuario ON usuario.id = endereco.id_usuario LEFT JOIN estado ON estado.id = endereco.estado LEFT JOIN pais ON pais.id = endereco.pais WHERE usuario.id = $1';

exports.postAddNewAddressQuery = 'INSERT INTO endereco( rua, numero, complemento, bairro, cidade, id_estado, id_pais, id_usuario) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 );'

exports.putEditAddressByIdQuery = 'UPDATE endereco SET rua = $1, numero = $2, complemento = $3, bairro = $4, cidade = $5, id_estado = $6, id_pais = $7 WHERE id_usuario = $8;'

exports.deleteAddressByIdQuery = 'DELETE FROM endereco WHERE id = $1';
