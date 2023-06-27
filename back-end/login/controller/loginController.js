const loginService = require('../service/loginService');

exports.validateUserToLogin = (req, res) => {
  const { login, senha } = req.body
  loginService.validateUserToLogin(login, senha)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
