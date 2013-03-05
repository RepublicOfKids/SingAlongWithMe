"use strict";
/*
 * GET home page.
 */

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
  console.log(req.body.roomId);
};
