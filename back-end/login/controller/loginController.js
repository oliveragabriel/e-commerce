const loginService = require('../service/loginService');

exports.validateUserToLogin = (req, res) => {
  const { idUsuario } = req.params
  const { senha } = req.body
  loginService.validateUserToLogin(idUsuario, senha)
    .then((result) => {
      res.status(200).send({ message: 'Login realizado com sucesso!' });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
