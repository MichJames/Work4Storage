"use strict";
exports.__esModule = true;
var metrics_1 = require("./metrics");
var express = require("express");
var bodyparser = require("body-parser");
var mongodb = require("mongodb");
var db;
var app = express();
// Initialize connection once
var MongoClient = mongodb.MongoClient; // Create a new MongoClient
MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true }, function (err, client) {
    if (err)
        throw err;
    db = client.db('mydb');
    // Start the application after the database connection is ready
    var port = process.env.PORT || '8115';
    app.listen(port, function (err) {
        if (err) {
            throw err;
        }
        console.log("server is listening on port " + port);
    });
    insertManyDocuments(db, function () {
        findDocuments(db, function () {
            client.close();
        });
    });
});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.post('/metrics', function (req, res) {
    if (req.body.value) {
        var metric = new metrics_1.Metric(new Date().getTime().toString(), parseInt(req.body.value));
        new metrics_1.MetricsHandler(db).save(metric, function (err, result) {
            if (err)
                return res.status(500).json({ error: err, result: result });
            res.status(201).json({ error: err, result: true });
        });
    }
    else {
        return res.status(400).json({ error: 'Wrong request parameter' });
    }
});
app["delete"]('/metrics', function (req, res) {
    if (req.body.value) {
        new metrics_1.MetricsHandler(db).remove({ value: req.body.value }, function (err, result) {
            if (err)
                return res.status(500).json({ error: err, result: result });
            res.status(201).json({ error: err, result: true });
        });
    }
    else {
        return res.status(400).json({ error: 'Wrong request parameter' });
    }
});
app.get('/metrics', function (req, res) {
    if (req.body.value) {
        var metric = new metrics_1.Metric(new Date().getTime().toString(), parseInt(req.body.value));
        new metrics_1.MetricsHandler(db).save(metric, function (err, result) {
            if (err)
                return res.status(500).json({ error: err, result: result });
            res.status(201).json({ error: err, result: true });
        });
    }
    else {
        return res.status(400).json({ error: 'Wrong request parameter' });
    }
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
        callback(docs);
    });
};
