"use strict";
exports.__esModule = true;
var Metric = /** @class */ (function () {
    function Metric(timestamp, value) {
        this.timestamp = timestamp;
        this.value = value;
    }
    return Metric;
}());
exports.Metric = Metric;
var MetricsHandler = /** @class */ (function () {
    function MetricsHandler(db) {
        this.db = db;
    }
    MetricsHandler.prototype.save = function (metric, callback) {
        var collection = this.db.collection('documents');
        // Insert some document
        collection.insertOne(metric, function (err, result) {
            if (err)
                return callback(err, result);
            console.log("Document inserted into the collection");
            callback(err, result);
        });
    };
    MetricsHandler.prototype.remove = function (query, callback) {
        console.log('remove');
        var collection = this.db.collection('documents');
        // Delete some document
        collection.deleteOne({ 'value': 22 }, function (err, result) {
            if (err)
                return callback(err, result);
            console.log("Document deleted into the collection");
            callback(err, result);
        });
    };
    MetricsHandler.prototype.getA = function (metric, callback) {
        var collection = this.db.collection('documents');
        // Delete some document
        collection.find(metric, function (err, result) {
            if (err)
                return callback(err, result);
            console.log("Document will get the collection");
            callback(err, result);
        });
    };
    return MetricsHandler;
}());
exports.MetricsHandler = MetricsHandler;
