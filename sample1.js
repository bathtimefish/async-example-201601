/**
 * Sample1
 */

"use strict"

var mongoose = require('mongoose');

var model = {
    "name": String,
    "message": String
};

mongoose.connect('[MONGODB_URL]');
var db = mongoose.connection;
db.once('open', function() {

    console.info('MongoDB Connected.');
    var Sample = mongoose.model("sample", model);

    Sample.findOne().lean().exec({}, function(err, doc) {
        console.log(doc);
        mongoose.disconnect();
    });

});
