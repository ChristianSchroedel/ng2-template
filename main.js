'use strict';

var express = require('express');
var path = require('path');
var PORT = 5555;
var app = express();

var DIST_DIR = path.resolve(__dirname, 'dist');

app.use('/', express.static(DIST_DIR));
app.get('*', function (req, res) {
  return res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, function () {
  console.log('app listening on port: ' + PORT);
});
