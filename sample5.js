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
 * --- babel.rc ---
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
    return new Promise((resolve, reject)=> {
        db.once('open', ()=> {
            console.info('MongoDB Connected.');
            resolve(mongoose.model("sample", model));
        });
        db.on('error', ()=> {
            reject('ConnectionError');
        });
    });
};

let findOne = function(Sample) {
    return new Promise((resolve, reject)=> {
        Sample.findOne().lean().exec({}, (err, doc)=> {
            if(err) reject(err);
            resolve(doc);
        });
    });
};

let main = async function() {

    try {
        let Sample = await open();
        let doc = await findOne(Sample);
        console.log(doc);
    } catch(e) {
        console.error(e);
    }
    mongoose.disconnect();

}();
