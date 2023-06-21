const loginService = require('../service/loginService');

exports.validateUserToLogin = (req, res) => {
  const { email, senha } = req.body
  loginService.validateUserToLogin(email, senha)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
