#!/usr/bin/env node
var path = require("path");
var glob = require("glob");
var express = require("express");
var fetch = require("./fetch");
var topics = require("./topics");

var app = express();

// Enable CORS
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// json api
app.get('/', function(req, res) {

    var topic = topics.getRandom();
    var promise = fetch.image(topic);

    promise.then(function(promise) {
        res.jsonp(promise);
    });

});

app.get('/:query', function(req, res) {

    var promise = fetch.image(req.params.query);

    promise.then(function(promise) {
        res.jsonp(promise);
    });

});


// if on port is set, use port.
var port = process.env.PORT || 1339;
app.listen(port);

console.log("app started of port " +  port);