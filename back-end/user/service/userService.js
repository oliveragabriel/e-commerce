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

exports.postAddNewUser = async (nome, sobrenome, atribuicao, senha, email) => {
  const values = [nome, sobrenome, atribuicao, senha, email];
  return await database.query(userQueries.postAddNewUserQuery, values)
    .then((result) => {
      return result.rows
    })
    .catch((error) => {
      throw error;
  });
};

exports.putEditUserById = async (nome, sobrenome, cpf, nacionalidade, email, telefone, idUsuario) => {
  const sqlColumnCpf = cpf ? `, cpf = '${cpf}'` : ''
  const sqlColumnNacionalidade = nacionalidade ? `, nacionalidade = ${nacionalidade}` : ''
  const sqlColumnTelefone = telefone ? `, telefone = '${telefone}'` : ''
  const sqlFinal = `UPDATE usuario SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}' ${sqlColumnCpf} ${sqlColumnNacionalidade} ${sqlColumnTelefone} WHERE id = ${idUsuario};`
  console.log("🚀 ~ exports.putEditUserById= ~ sqlFinal:", sqlFinal)
  return await database.query(sqlFinal)
    .then((result) => result.rows)
    .catch((error) => {
      console.log("🚀 ~ exports.putEditUserById= ~ error:", error)
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

exports.getUserAddress = async (idUsuario) => {
  const values = [idUsuario];
  return await database.query(userQueries.getUserAddressQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.postAddNewAddress = async (rua, numero, complemento, bairro, cidade, estado, pais, idUsuario) => {
  const validateComplemento = complemento ?? 'Sem Complemento'
  const values = [rua, numero, validateComplemento, bairro, cidade, estado, pais, idUsuario];
  return await database.query(userQueries.postAddNewAddressQuery, values)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

exports.putEditAddressById = async (rua, numero, complemento, bairro, cidade, estado, pais, idUsuario, idEndereco) => {
  const sqlColumnComplemento = complemento ? `, complemento = '${complemento}'` : ''
  const sqlFinal = `UPDATE endereco SET rua = '${rua}', numero = ${numero}, bairro = '${bairro}', cidade = '${cidade}', estado = ${estado}, pais = ${pais} ${sqlColumnComplemento} WHERE id = ${idEndereco} AND id_usuario = ${idUsuario};`
  return await database.query(sqlFinal)
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

exports.putEditPasswordById = async (senha, idUsuario) => {
  const sql = `UPDATE usuario SET senha = '${senha}' WHERE id = ${idUsuario};`
  return await database.query(sql)
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};