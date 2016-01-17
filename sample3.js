/**
 * Sample3
 */

/*
 * $npm install --save co
 */

"use strict"

var mongoose = require('mongoose');
var co = require('co');

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
};

var findOne = function(Sample) {
    return new Promise(function(resolve) {
        Sample.findOne().lean().exec({}, function(err, doc) {
            resolve(doc);
        });
    });
};

co(function* () {

    var Sample = yield open();
    var doc = yield findOne(Sample);
    console.log(doc);
    mongoose.disconnect();

}).catch(function(err) {
    throw 'Error';
});
