
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'sing along with me' });
};
