var Rdio = {};

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

function searchRdio() {
  var query = $("#searchInput").val();
  Rdio.search(query, renderRdioResults);
  //TODO: Update numResults and fn
  //musixmatchGetTrackId(query, numResults, fn);
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
