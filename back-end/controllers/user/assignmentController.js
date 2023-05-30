const assignmentService = require('../../services/user/assignmentService');

exports.listUserAssignments = (_, res) => {
  assignmentService.listAllAssignments()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.status(500).send({ error });
    });
};
