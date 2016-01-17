/**
 * Sample4
 */

/*
 * --- setup ---
 * $ npm install -g babel-cli
 * $ npm install --save babel
 * $ npm install --save babel-plugin-syntax-async-functions
 * $ npm install --save babel-plugin-transform-regenerator
 * $ npm install --save babel-preset-es2015
 * --- .babelrc ---
 * {
 *   "presets": ["es2015"],
 *   "plugins": ["syntax-async-functions", "transform-regenerator"]
 * }
 * ----------------
 * $ babel-node sample4.js
 */

"use strict";

let mongoose = require('mongoose');

var model = {
    "name": String,
    "message": String
};

mongoose.connect('[MONGODB_URL]');
let db = mongoose.connection;

let open = function() {
    return new Promise(function(resolve) {
        db.once('open', function() {
            console.info('MongoDB Connected.');
            resolve(mongoose.model("sample", model));
        });
    });
};

let findOne = function(Sample) {
    return new Promise(function(resolve) {
        Sample.findOne().lean().exec({}, function(err, doc) {
            resolve(doc);
        });
    });
};

let main = async function() {

    let Sample = await open();
    let doc = await findOne(Sample);
    console.log(doc);
    mongoose.disconnect();

}();
