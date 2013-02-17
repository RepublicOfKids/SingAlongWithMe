var LYRICFIND_DISPLAY_KEY = 'asdad',
    LYRICFIND_LRC_KEY = 'asdas',
    LYRICFIND_SEARCH_KEY = 'asdas',
    Rdio = {};

;(function($) {

  R.ready(function() {
    Rdio = new RdioHelper();

    $("#goButton").on("click", searchRdio);

    $("#searchInput").keypress(function(e) {
      if(e.which == 13) {
          searchRdio();
      }
    });

    $('body').on('click', '.list-search-result', function(event) {
      var $searchResult = $(event.target);
      window.playBackKey = $searchResult.data('key');
      Rdio.play(window.playBackKey);
    });

    $('#rdioPlay').on('click', function() {
      Rdio.togglePause();
    });

    $('#rdioPause').on('click', function(event) {
      Rdio.pause();
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

function searchRdio() {
  var query = $("#searchInput").val();
  Rdio.search(query, renderRdioResults);
}

function renderRdioResults() {
  var songs = window.searchResults.results,
      resultsHtml = '';

  if(songs.length === 0) {
    $("#rdioResultsContainer").html('<p>Sorry, no results found.</p>')
    return;
  }
  for (var i = 0; i < songs.length; i++){
    resultsHtml = resultsHtml + '<li class="list-search-result" data-key=' + songs[i].key + '>Song Title: ' + songs[i].name + ', Album Name: ' + songs[i].album + '</li>';
  }
  $("#rdioResultsContainer").html(resultsHtml);

}


