'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var powerManagement_routes = require('./routes/power-management');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', powerManagement_routes);

module.exports = app;