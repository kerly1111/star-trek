'use strict'

var express = require('express');
var powerManagementController = require('../controllers/power-management');

var router = express.Router();

router.post('/calculate', powerManagementController.calculate);

module.exports = router;