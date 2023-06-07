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

exports.postAddNewUser = async (nome, sobrenome, atribuicao, senha) => {
  const values = [nome, sobrenome, atribuicao, senha];
  return await database.query(userQueries.postAddNewUserQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.putEditUserById = async (nome, sobrenome, dtNascimento, cpf, nacionalidade, senha, idUsuario ) => {
  const values = [nome, sobrenome, dtNascimento, cpf, nacionalidade, senha, idUsuario];
  return await database.query(userQueries.putEditUserByIdQuery, values)
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