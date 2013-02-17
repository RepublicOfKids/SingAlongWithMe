var LYRICFIND_DISPLAY_KEY = 'asdad',
    LYRICFIND_LRC_KEY = 'asdas',
    LYRICFIND_SEARCH_KEY = 'asdas',
    Rdio = {};

;(function($) {

  R.ready(function() {
    Rdio = new RdioHelper();

    $("#goButton").on("click", function () {
      var query = $("#searchInput").val();
      Rdio.search(query, renderRdioResults());
    });
  });

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

function renderRdioResults() {
  window.console.log(window.searchResults);
}


