exports.listAllAssignmentsQuery = 'SELECT * FROM atribuicao';

exports.getUserByIdQuery = 'SELECT u.id, u.nome, u.sobrenome, u.cpf, u.dt_nascimento, u.nacionalidade, u.atribuicao, u.email, u.telefone FROM usuario u WHERE u.id = $1';

exports.postAddNewUserQuery = 'INSERT INTO usuario( nome, sobrenome, atribuicao, senha, email) VALUES ( $1, $2, $3, $4, $5 );';

exports.deleteUserByIdQuery = 'DELETE FROM usuario WHERE id = $1';

exports.getUserAddressQuery = 'SELECT endereco.id, endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, estado.nome as "estado", pais.nome as "pais" FROM endereco INNER JOIN usuario ON usuario.id = endereco.id_usuario LEFT JOIN estado ON estado.id = endereco.estado LEFT JOIN pais ON pais.id = endereco.pais WHERE usuario.id = $1';

exports.postAddNewAddressQuery = 'INSERT INTO endereco( rua, numero, complemento, bairro, cidade, estado, pais, id_usuario) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8 );'

exports.deleteAddressByIdQuery = 'DELETE FROM endereco WHERE id = $1';
