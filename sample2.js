/**
 * Sample2
 */

"use strict"

var mongoose = require('mongoose');

var model = {
    "name": String,
    "message": String
};

mongoose.connect('[MONGODB_URL]');
var db = mongoose.connection;

var open = function() {
    return new Promise(function(resolve) {
        db.once('open', function() {
            console.info('MongoDB Connected.');
            resolve(mongoose.model("sample", model));
        });
    });
}

var findOne = function(Sample) {
    return new Promise(function(resolve) {
        Sample.findOne().lean().exec({}, function(err, doc) {
            resolve(doc);
        });
    });
}

open().then(function(Sample) {
    return findOne(Sample);
}).then(function(doc) {
    console.log(doc);
    mongoose.disconnect();
});
