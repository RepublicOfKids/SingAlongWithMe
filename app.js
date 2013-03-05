/**
 * Module dependencies.
 */
var express    = require('express'),
    http       = require('http'),
    path       = require('path'),
    domain     = require('domain'),
    util       = require('util'),
    app        = express(),
    server     = app.listen(process.env.PORT),
    routes     = require('./routes'),
    randomCode = require('./modules/randomCode.js').RandomCode;

// Global Objects
io = require('socket.io').listen(server);


function hangups(req, res, next) {
    var reqd = domain.create();
    reqd.add(req);
    reqd.add(res);
    reqd.on('error', function (error) {
        if (error.code !== 'ECONNRESET') console.error(error, req.url);
        reqd.dispose();
    });
    next();
}

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
  app.use(hangups);
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

// Routes
app.get('/', routes.index);
app.get('/join', routes.join);
app.post('/join_room', routes.join_room);

io.configure(function () {
	io.set("transports", ["xhr-polling"]);
	io.set("polling duration", 10);
});

io.sockets.on('connection', function (socket) {
	// When the host creates a room
	socket.on('create room', function() {
    var roomId = randomCode.get();
    while (typeof io.sockets.manager.rooms['/'+roomId] !== 'undefined') {
      roomId = randomCode.get();
    }
    socket.join(roomId);
    socket.emit('created roomId', roomId);
    console.log("Checking room: " + util.inspect(io.sockets.manager.rooms, false, null));
	});

	// When the user disconnects
	socket.on('disconnect', function(){
		// Echo globally that this client has left
		// socket.broadcast.emit('updateroom', 'SERVER', socket.username + ' has disconnected');
    // TODO: Does socket IO clean up after us?
    //socket.leave('room');
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + process.env.PORT);
});
