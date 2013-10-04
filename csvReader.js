var fs = require('fs');
var url = require('url');
var responseHandler = require('./jsonResponse.js');
var parser = require('./csvParser.js');

module.exports = function (request, response) {

    var query = url.parse(request.url, true).query;
    var fileName = query.file + '.csv';

    fs.readFile(fileName, [], function (err, data) {

        if (err) {
            throw err;
        }

        parser(data, function(data) {
            responseHandler(response, request, data);
        });

    });

}
