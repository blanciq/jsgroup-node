module.exports = function(data, callback) {

    var headers = [];
    var lines = [];
    var result = [];

    var parseFile = function (file) {
        return file.toString().split('\r\n');
    }

    var getHeaders = function() {
        return lines.shift().split(',');
    }

    var parseLine = function (line) {
        var values = line.split(',');
        return record_combine(headers,values);
    };

    var record_combine = function (keys, values) {

        var record = {};

        for (var i in keys) {
            record[keys[i]] = values[i];
        }

        return record;
    }

    lines = parseFile(data);
    headers = getHeaders();

    for (var i in lines) {
        result.push(parseLine(lines[i]));
    }

    callback(result)
}
