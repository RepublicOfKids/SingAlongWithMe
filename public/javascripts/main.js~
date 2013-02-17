var LYRICFIND_DISPLAY_KEY = 'asdad',
    LYRICFIND_LRC_KEY = 'asdas',
    LYRICFIND_SEARCH_KEY = 'asdas',
    Rdio = {};

;(function($) {

  R.ready(function() {
    Rdio = new RdioHelper();

    $("#goButton").on("click", function () {
      var query = $("#searchInput").val();
      Rdio.search(query, renderRdioResults);
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
  var songs = window.searchResults.results;
  if(songs.length === 0) {
    $("#rdioResultsContainer").html('<p>Sorry, no results found.</p>')
    return;
  }
  
  var resultsHtml = '';
  for (var i = 0; i < songs.length; i++){
    resultsHtml = resultsHtml + '<li>Song Title: ' + songs[i].name + ', Album Name: ' + songs[i].album + '</li>';
  }

  $("#rdioResultsContainer").html(resultsHtml);

}


