"use strict";
exports.__esModule = true;
var MongoClient = require('mongodb').MongoClient;
// Connection URL
var url = 'mongodb://localhost:27017';
// Database Name
var dbName = 'mydb';
// Create a new MongoClient
var client = new MongoClient(url, { useNewUrlParser: true });
// Use connect method to connect to the Server
client.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");
    var db = client.db(dbName);
    insertManyDocuments(db, function () {
        findDocuments(db, function () {
            client.close();
        });
    });
});
var insertManyDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    var metrics = [
        { timestamp: new Date().getTime().toString(), value: 11 },
        { timestamp: new Date().getTime().toString(), value: 22 },
        { timestamp: new Date().getTime().toString(), value: 22 },
    ];
    collection.insertMany(metrics, function (err, result) {
        if (err)
            throw err;
        console.log("Document inserted into the collection");
        callback(result);
    });
};
var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        if (err)
            throw err;
        console.log("Found the following documents");
        console.log(docs);
        callback(docs);
    });
};
