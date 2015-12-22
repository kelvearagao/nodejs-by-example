var http = require('http');
var fs = require('fs');
var path = require('path');
var Assets = require('./backend/Assets');

var files = {};
var port = 9000;
var host = '127.0.0.1';

var app = http.createServer(Assets).listen(port, host);

console.log("Listen on " + host + ":" + port);

// sudo ln -s /usr/bin/nodejs /usr/bin/node