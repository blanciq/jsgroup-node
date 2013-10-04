var http = require('http');
var reader = require('./csvReader.js');

http.createServer(reader).listen(8888);