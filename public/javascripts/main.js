;(function($) {
  "use strict";
  var Rdio = {};

  R.ready(function() {
    Rdio = new RdioHelper();

    var searchForSong = function() {
      var query = $("#searchInput").val();
      musixmatchGetTrackId(query, 50, Rdio.search.bind(this, query, renderSuggestions));
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
      $("#rdioResultsContainer").html(resultsHtml).hide();
      $("#rdioResultsContainer").show(1200);
    };

    var computeMoodBg = function() {
      console.log(window.audioSummary);
    };

    var hideSearchContainer = function() {
      $('#searchContainer').addClass('hidden');
    };

    var renderLyrics = function() {
      var lyricTemplate = $('#lyricTemplate').html();
      window.timeoutsArray = [];


      hideSearchContainer();

      for (var i = 0; i < lrcDataPoints.times.length; i++) {
        $('#lyricsContainer').append(Hogan.compile(lyricTemplate).render({
          lyric     : lrcDataPoints.lyrics[i],
          timestamp : lrcDataPoints.times[i],
          i         : i
        }));
        setTimeoutEvents(lrcDataPoints.times[i], window.timeoutsArray);
      }
    };

    var setTimeoutEvents = function(delay, timeoutsArray) {
      timeoutsArray.push(window.setTimeout(function() {
        $('.highlight-lyric').removeClass('highlight-lyric');
        $("#lyricsContainer").find("[data-time='" + delay + "']").addClass('highlight-lyric');
      }, delay));
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
      musixmatchGetLrcSubtitle(window.trackId, parseLrcData);
      echonestGetAudioSummary(window.trackId, computeMoodBg);
      Rdio.play(window.playBackKey);
      $('#rdioPlayer').removeClass('hidden');
    });

    $('#rdioPlay').on('click', function() {
      Rdio.togglePause();
    });

    $('#rdioPause').on('click', function(event) {
      Rdio.pause();
    });

    $.subscribe('show_lyrics', renderLyrics);
  });
})(window.jQuery);




