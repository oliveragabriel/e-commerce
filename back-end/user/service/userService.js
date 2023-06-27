const database = require('../../database');
const userQueries = require('./sql/userQueries');

exports.listAllAssignments = () => {
  return database.query(userQueries.listAllAssignmentsQuery)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserById = (idUsuario) => {
  const values = [idUsuario];
  return database.query(userQueries.getUserByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewUser = async (nome, sobrenome, atribuicao, senha, login) => {
  const values = [nome, sobrenome, atribuicao, senha, login];
  return await database.query(userQueries.postAddNewUserQuery, values)
    .then((result) => {
      return result.rows
    })
    .catch((error) => {
      throw error;
  });
};

exports.putEditUserById = async (nome, sobrenome, cpf, nacionalidade, email, telefone, idUsuario, hasContato, login) => {
  const sqlColumnCpf = cpf ? `, cpf = '${cpf}'` : ''
  const sqlColumnNacionalidade = nacionalidade ? `, nacionalidade = ${nacionalidade}` : ''
  const sqlColumnTelefone = telefone ? `, telefone = '${telefone}'` : ''
  const sqlHandleTableContato = hasContato ? `UPDATE contato SET email = '${email}' ${sqlColumnTelefone} WHERE id_usuario = ${idUsuario};` : `INSERT INTO contato( ${telefone ? `telefone,` : ''} email, id_usuario) VALUES ( ${telefone ? `'${telefone}',` : ''} '${email}', ${idUsuario} );`
  const sqlFinal = `UPDATE usuario SET login = ${login}, nome = '${nome}', sobrenome = '${sobrenome}' ${sqlColumnCpf} ${sqlColumnNacionalidade} WHERE id = ${idUsuario}; ${sqlHandleTableContato}`
  return await database.query(sqlFinal)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.deleteUserById = async (idUsuario) => {
  const values = [idUsuario];
  return await database.query(userQueries.deleteUserByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserContact = async (idUsuario) => {
  const values = [idUsuario];
  return await database.query(userQueries.getUserContactQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewContact = async (ddd, numero, email, idUsuario) => {
  const values = [ddd, numero, email, idUsuario];
  return await database.query(userQueries.postAddNewUserQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.putEditContactById = async (ddd, numero, email, idUsuario) => {
  const values = [ddd, numero, email, idUsuario];
  return await database.query(userQueries.putEditContactByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.deleteContactById = async (idContato) => {
  const values = [idContato];
  return await database.query(userQueries.deleteContactByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.getUserAddress = async (idUsuario) => {
  const values = [idUsuario];
  return await database.query(userQueries.getUserAddressQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewAddress = async (rua, numero, complemento, bairro, cidade, idEstado, idPais, idUsuario) => {
  const values = [rua, numero, complemento, bairro, cidade, idEstado, idPais, idUsuario];
  return await database.query(userQueries.postAddNewAddressQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.putEditAddressById = async (rua, numero, complemento, bairro, cidade, idEstado, idPais, idUsuario) => {
  const values = [rua, numero, complemento, bairro, cidade, idEstado, idPais, idUsuario];
  return await database.query(userQueries.putEditAddressByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.deleteAddressById = async (idEndereco) => {
  const values = [idEndereco];
  return await database.query(userQueries.deleteAddressByIdQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};