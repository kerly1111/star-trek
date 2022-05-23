'use strict'

var app = require('./app');
var port = 4300;

app.listen(port, () => {
    console.log("Server running successfully on url: localhost:4300");
});