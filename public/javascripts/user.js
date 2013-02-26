var user = (function() {
  "use strict";

	var user = {};

	function isMobile() {
	    return !!navigator.userAgent.match(/(ipad|iphone|ipod|android|webos|mobile)/i);
	}

	user.isMobile = isMobile();

	return user;

}());

