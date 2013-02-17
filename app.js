/**
 * Module dependencies.
 */

var port = process.env.PORT || 3000;

var express = require('express'),
    routes  = require('./routes'),
    //  user    = require('./routes/user'),
    http    = require('http'),
    path    = require('path'),
    app     = express(),
    server  = app.listen(port), //require('http').createServer(app),
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

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
//app.get('/users', user.list);

// usernames which are currently connected to the root
var usernames = {};
io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});
io.sockets.on('connection', function (socket) {
	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		socket.username = username;
		// add the client's username to the global list
		usernames[username] = username;
		// echo to client they've connected
		// TODO: emit data about room to user
		socket.emit('updateroom', 'SERVER', 'you have connected');
		// echo globally (all clients) that a person has connected
		// TODO: Update room info to all other clients
		socket.broadcast.emit('updateroom', 'SERVER', username + ' has connected');
		// update the list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
	    });

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
		// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);
		// echo globally that this client has left
		socket.broadcast.emit('updateroom', 'SERVER', socket.username + ' has disconnected');
	    });
    });

http.createServer(app).listen(app.get('port'), function(){
  //  console.log("Express server listening on port " + app.get('port'));
  console.log("Express server listening on port " + port;
});
