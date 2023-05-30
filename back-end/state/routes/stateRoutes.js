const express = require('express');
const stateController = require('../controller/stateController');

const router = express.Router();

router.get('/list', stateController.listAllStates);

module.exports = router;
