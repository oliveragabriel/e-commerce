exports.validateUserToLoginQuery = 'SELECT usuario.nome, usuario.id FROM usuario INNER JOIN contato ON contato.email = $1 WHERE usuario.senha = $2 AND usuario.id = contato.id_usuario';