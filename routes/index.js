
/*
 * GET home page.
 */

exports.index = function(req, res){
    var userAgent = req.header('user-agent');
    var isMobile  = !!userAgent.match(/(ipad|iphone|ipod|android|webos|mobile)/i); 
    
    if (isMobile) {
	res.render('mobile', { title: 'sing along with me client' });
    } else {
	res.render('index', { title: 'sing along with me' });
    }
};
