'use strict';

  var logger = function() {
    var d = new Date();
    var data = [d.toISOString() + '[' + process.pid + ']: >'];
    var args = Array.prototype.slice.call(arguments);
    return console.log.apply(this, data.concat(args));
  };


var fileApp = require('./app/file-server.js');
fileApp.logger = logger;
fileApp.set('port', process.env.PORT || 9000);

/* Binding */
var fileServer = fileApp.listen(fileApp.get('port'), function() {
  logger('Express file-server listening on port ' + fileServer.address()
	.port);
});
