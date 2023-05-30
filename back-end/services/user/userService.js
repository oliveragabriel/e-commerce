const database = require('../database');

exports.getUserById = (userId) => {
  const query = 'SELECT * FROM usuario WHERE id = $1';
  const values = [userId];

  return database.query(query, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserContact = (userId) => {
  const query = 'SELECT contato.ddd, contato.numero, contato.email FROM contato INNER JOIN usuario ON usuario.id = contato.id_usuario WHERE usuario.id = $1';
  const values = [userId];

  return database.query(query, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserAddress = (userId) => {
  const query = 'SELECT endereco.rua, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, estado.nome, estado.sigla, pais.nome, pais.sigla FROM endereco INNER JOIN usuario ON usuario.id = endereco.id_usuario LEFT JOIN estado ON estado.id = endereco.estado LEFT JOIN pais ON pais.id = endereco.pais WHERE usuario.id = $1';
  const values = [userId];

  return database.query(query, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
