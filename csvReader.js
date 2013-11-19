var fs = require('fs');
var url = require('url');
var responseHandler = require('./jsonResponse.js');
var parser = require('./csvParser.js');
var PersonModel = require('./PersonModel');

module.exports = function (request, response) {

    function returnResponse(data) {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        responseHandler(response, request, data);
    };

    function onGet(fileName) {
        fs.readFile(fileName, [], function (err, data) {
            if (err) {
                console.error(err);
                throw err;
            }

            parser(data, function(data) {
                returnResponse(data);
            });

        });
    };

    function onPost(fileName) {
        var postBody = '';
        request.on('data', function (data) {
            postBody += data;
        });
        request.on('end', function () {
            try {
                var newPerson = PersonModel.build(JSON.parse(postBody));
                fs.writeFile(fileName, 'name,surname,mail,currency,datetime\n' + newPerson.toCsvLine(), {flag: 'a'}, function (err) {
                    if (err) {
                        throw err;
                    }

                    returnResponse({success: true, message: 'Person has been added'});
                });
            }
            catch(e) {
                console.error(e);
                returnResponse({success: false, message: 'Invalid json string', data: null});
            }
        });

    }

    var query = url.parse(request.url, true).query;
    var fileName = query.file + '.csv';

    try {
        if (request.method == 'POST') {
            onPost(fileName);
        }
        else {
            onGet(fileName);
        }
    }
    catch(e) {
        returnResponse({success: false, message: e, data: null});
    }
}
