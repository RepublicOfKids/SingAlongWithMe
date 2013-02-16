var LYRICFIND_DISPLAY_KEY = 'asdad';
var LYRICFIND_LRC_KEY = 'asdas';
var LYRICFIND_SEARCH_KEY = 'asdas';

;(function($) {

  // Code goes here.
})(window.jQuery);

function search(query) {
  var searchParams = {
    apikey: LYRICFIND_SEARCH_KEY,
    reqtype: "default",
    searchtype: "track",
    all: "query",
    limit: 1
  };

  var searchUrl = 'http://api.lyricfind.com/search.do?' +  $.param(searchParams);
  
  return searchUrl;
  
  // ajax search url and get trackid
}
