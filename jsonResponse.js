module.exports = function (response, request, data) {
    response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
    response.write(JSON.stringify(data));
    response.end();
}
