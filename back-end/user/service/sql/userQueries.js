exports.listAllAssignmentsQuery = 'SELECT * FROM atribuicao';

exports.getUserByIdQuery = 'SELECT * FROM usuario WHERE id = $1';

exports.getUserContactQuery = 'SELECT contato.ddd, contato.numero, contato.email FROM contato INNER JOIN usuario ON usuario.id = contato.id_usuario WHERE usuario.id = $1';

exports.getUserAddressQuery = 'SELECT endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, estado.nome, estado.sigla, pais.nome, pais.sigla FROM endereco INNER JOIN usuario ON usuario.id = endereco.id_usuario LEFT JOIN estado ON estado.id = endereco.estado LEFT JOIN pais ON pais.id = endereco.pais WHERE usuario.id = $1';

