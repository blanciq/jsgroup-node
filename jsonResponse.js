module.exports = function (response, request, data) {
    response.writeHead(200, {"Access-Control-Allow-Origin": "http://localhost:8889"});
    response.write(JSON.stringify(data));
    response.end();
}
