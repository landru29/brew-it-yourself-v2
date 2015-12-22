/*global require,console,__dirname*/
(function() {
  'use strict';

  var extend = require('extend');
  var express = require('express');
  var http = require('http');
  var url = require('url');
  var app = express();

  // Filesystem
  app.use(new(require('./middlewares/filesystem-middleware.js'))({
    basePath: __dirname + '/..',
    public: {
      folder: '../public',
      default: 'index.html'
    },
    app: app
  }).middleware());

  module.exports = app;
})();
