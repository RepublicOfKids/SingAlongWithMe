var Rdio = {};

;(function($) {

  R.ready(function() {
    Rdio = new RdioHelper();

    var searchForSong = function() {
      var query = $("#searchInput").val();
      musixmatchGetTrackId(query, 10, Rdio.search.bind(this, query, renderSuggestions));
    };

    var filterArray = function(a, b) {
      var filteredArray = [];
      for (var i = 0; i < a.length; i++) {
        for (var j = 0; j < b.length; j++) {
          if (a[i].track.toLowerCase() === b[j].track.toLowerCase() && a[i].artist.toLowerCase() === b[j].artist.toLowerCase() && a[i].album.toLowerCase() === b[j].album.toLowerCase()) {
            a[i].track_id = b[j].key;
            filteredArray.push(a[i]);
          }
        }
      }
      return filteredArray;
    };

    var parseLRCData = function(data) {
      console.log(data);
    };

    var renderSuggestions = function() {
      var songs = filterArray(window.rdioData, window.musixmatchData),
          resultsHtml = '';

      if(songs.length === 0) {
        $("#rdioResultsContainer").html('<p>Sorry, no results found.</p>');
        return;
      }
      for (var i = 0; i < songs.length; i++){
        resultsHtml = resultsHtml + '<li class="list-search-result" data-key=' + songs[i].key + ' data-track-id=' + songs[i].track_id + '>' + songs[i].artist + ' - ' + songs[i].track + '</li>';
      }
      $("#rdioResultsContainer").html(resultsHtml);

    };

    // DOM EVENTS
    $("#goButton").on("click", searchForSong);

    $("#searchInput").keypress(function(e) {
      if(e.which === 13) {
          searchForSong();
      }
    });

    $('body').on('click', '.list-search-result', function(event) {
      var $searchResult = $(event.target);
      window.playBackKey = $searchResult.data('key');
      window.trackId = $searchResult.data('track-id');
      musixmatchGetLrcSubtitle(window.trackId, parseLRCData);
      Rdio.play(window.playBackKey);
      echonestGetAudioSummary(window.trackId);
    });

    $('#rdioPlay').on('click', function() {
      Rdio.togglePause();
    });

    $('#rdioPause').on('click', function(event) {
      Rdio.pause();
    });
  });
})(window.jQuery);




