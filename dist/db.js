"use strict";
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var url = 'mongodb://localhost:27017';
function clientStart(callback) {
    var MongoClient = mongodb_1["default"].MongoClient;
    var client = new MongoClient(url, { useNewUrlParser: true });
    // Use connect method to connect to the Server
    client.connect(function (err) {
        if (err)
            throw err;
        console.log("Connected successfully to server");
        callback(client);
    });
}
exports["default"] = clientStart;
