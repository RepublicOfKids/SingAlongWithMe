/*global io */

"use strict";
/*
 * GET home page.
 */

var util       = require('util');

exports.index = function(req, res) {
    var userAgent = req.header('user-agent'),
        isMobile  = !!userAgent.match(/(ipad|iphone|ipod|android|webos|mobile)/i);

    if (isMobile) {
	    res.render('mobile', { title: 'sing along with me client' });
    } else {
	    res.render('index', { title: 'sing along with me' });
    }
};

exports.join = function(req, res) {
  res.render('join', {title: "Enter a Room"});
};

exports.join_room = function(req, res) {
  var roomId = req.body.roomId;
  if (io.sockets.manager.rooms['/' + roomId]) {
    res.redirect('/#' + roomId);
  } else {
    // Return json instead?
    res.write('No room for that id');
    res.end();
  }
};
