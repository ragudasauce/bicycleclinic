var server = require('./server');
var router = require('./router');
var requestHandler = require('./requestHandlers');

var handle = new Array();
handle['/'] = requestHandler.homepage;
handle['/support'] = requestHandler.supportFiles;
handle['404'] = requestHandler.send404;

server.start(router.route, handle);