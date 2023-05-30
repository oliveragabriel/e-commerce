const express = require('express');
const countryController = require('../controller/countryController');

const router = express.Router();

router.get('/list', countryController.listAllCountries);

module.exports = router;
