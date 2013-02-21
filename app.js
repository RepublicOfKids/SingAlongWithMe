/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes'),
    http    = require('http'),
    path    = require('path'),
    app     = express(),
    server  = app.listen(process.env.PORT),
    io      = require('socket.io').listen(server);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('less-middleware')({
    src: __dirname + '/public'
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Node Fly Analytics
require('nodefly').profile(
  '75e62077-1aa6-4caf-90c2-fdf89d6cdb89',
  ['Just Sing It']
);

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
	// When the client is added
	socket.on('addUser', function(message) {
		// Echo globally (all clients) that a person has connected
		socket.broadcast.emit('broadcastData', message);
	});

	// When the user disconnects
	socket.on('disconnect', function(){
		// Echo globally that this client has left
		// socket.broadcast.emit('updateroom', 'SERVER', socket.username + ' has disconnected');
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + process.env.PORT);
});
