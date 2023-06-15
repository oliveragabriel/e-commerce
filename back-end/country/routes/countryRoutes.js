const express = require('express');
const countryController = require('../controller/countryController');

const router = express.Router();

router.get('/', countryController.listCountry);

module.exports = router;
