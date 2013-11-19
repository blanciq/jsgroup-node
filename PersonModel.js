function PersonModel() {
    var self = this;
    self.name = '';
    self.surname = '';
    self.mail = '';
    self.currency = '';
    self.datetime = new Date();

    function parseDateToString () {
        var datetime = self.datetime;
        return datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDate() + ' ' + datetime.getHours() + ':' + datetime.getMinutes()
    };

    self.toCsvLine = function () {
        return self.name + ',' + self.surname + ',' + self.mail + ',' + self.currency + ',' + parseDateToString() + '\n';
    };
};

PersonModel.build = function (rawObject) {
    var model = new PersonModel();

    try {
        model.name = rawObject.name;
        model.surname = rawObject.surname;
        model.mail = rawObject.mail;
        model.currency = rawObject.currency;
		model.datetime = new Date(rawObject.datetime);
    }
    catch (e) {
        throw 'Error during parsing raw person object';
    }

    return model;
};

module.exports = PersonModel;