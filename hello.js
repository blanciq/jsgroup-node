var http = require('http');
var reader = require('./csvReader.js');

var app = http.createServer(reader);

app.listen(8080);