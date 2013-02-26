/*global Backbone _ $ ENTER_KEY Hogan R*/

;(function($) {
  "use strict";

  var socket = io.connect(window.location.href);
  // Connecting to server
  socket.on('connect', function(){
	  socket.emit('addUser', prompt("What?"));
      });

  // Updating the room
  socket.on('broadcastData', function (data) {
	  alert(data);
  });

  var Rdio = {};

  R.ready(function() {
    Rdio = new app.RdioHelper();

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
        $("#rdioResultsContainer").html('<p>Sorry, no results found.</p>').removeClass('hidden');
        return;
      }
      for (var i = 0; i < songs.length; i++){
          resultsHtml = resultsHtml + '<li class="list-search-result" data-key=' + songs[i].key + ' data-track-id=' + songs[i].track_id + '>' + songs[i].artist + ' - ' + songs[i].track + '</li>';
      }
      $("#rdioResultsContainer").html(resultsHtml).removeClass('hidden');
      $('#credits').addClass('hidden');
    };

    var computeMoodBg = function() {
      console.log(window.audioSummary);

      var speedCoef = 800 + ".";
      var energyCoef1 = 0.5;
      var energyCoef2 = 0.5;
      var loudnessCoef = 0.6;

      if (audioSummary) {
        var energy = audioSummary.energy;
        if (energy) {
          energyCoef1 = energy;
          energyCoef2 = mapNumberRanges(0, 1, 1, 0, energy);
        }
        var loudness = audioSummary.loudness;
        if (loudness) {
          loudnessCoef = mapNumberRanges(-16, -2, 0, 1, loudness);
        }
        var tempo = audioSummary.tempo;
        if (tempo) {
          speedCoef = mapNumberRanges(70, 160, 1000, 50, tempo);
        }
        var danceability = audioSummary.danceability;
        if (danceability && danceability > 0.75) {
          $("#psyContainer").show();
        }
      }
      console.log("rave - speed " + speedCoef + "\n loudness " + loudnessCoef +
       "\n energy " + energyCoef1 + " dance: " + danceability);
      if (!Glsl.supported()) alert("WebGL is not supported.");
      var glsl = Glsl({
        canvas: document.getElementById("viewport"),
        fragment:
            "#ifdef GL_ES\n" +
            "precision mediump float;\n" +
            "#endif\n" +
            "uniform float time;\n" +
            "uniform vec2 resolution;\n" +
            "void main (void) {\n" +
            "vec2 p = ( gl_FragCoord.xy / resolution.xy );\n" +
            "gl_FragColor = vec4(0.9 * (p.x * " + energyCoef1 + " + " + energyCoef2 + " * (1.+cos(time/"+ speedCoef +
            "))/2.), 0.9 * (p.y * " + energyCoef1 + " + " + energyCoef2 + " * (1.+cos(time/"+ speedCoef +
            "))/2.), (1.+cos(time/"+ speedCoef +
            "))/2., " + loudnessCoef + ");\n" +
            "}",
        variables: {
          time: 0 // The time in ms
        },
        update: function (time) {
          this.set("time", time);
        }
      }).start();
    };

    var mapNumberRanges  = function(min1, max1, min2, max2, input) {
      return ((input - min1) / (max1 - min1)) * (max2 - min2) + min2;
    };

    var hideSearchContainer = function() {
      $('h1').addClass('hidden');
      $('#searchContainer').addClass('hidden');
    };

    var renderLyrics = function() {
      if(lrcDataPoints.lyrics.length === 1 && lrcDataPoints.times.length === 0) {
	      $("#rdioResultsContainer").html('<p>'+lrcDataPoints.lyrics[0]+'</p>');
	      return;
	    }
    };

    var renderTokbox = function() {
      TB.setLogLevel(TB.DEBUG); // Set this for helpful debugging messages in console
      window.session = TB.initSession(TOKBOX_SESSION_ID);
      session.addEventListener('sessionConnected', sessionConnectedHandler);
      session.addEventListener('streamCreated', streamCreatedHandler);
      session.connect(TOKBOX_API_KEY, TOKBOX_TOKEN);
    };

    window.setTimeoutEvents = function(delay, timeoutsArray, i) {
      timeoutsArray.push(window.setTimeout(function() {
        $('.highlight-lyric').removeClass('highlight-lyric');
        $("#lyricsContainer").find("[data-time='" + delay + "']").addClass('highlight-lyric');
        $('#lyricsContainer').scrollTop(36 * i);
      }, delay));
    };

    var lyricsContainer = new app.LyricsContainerView();

    // DOM EVENTS
    $("#goButton").on("click", searchForSong);

    $("#searchInput").keypress(function(e) {
      if(e.which === 13) {
          searchForSong();
      }
    });

    $('body').on('click', '.list-search-result', function(event) {
      var $searchResult  = $(event.target);
      window.playBackKey = $searchResult.data('key');
      window.trackId     = $searchResult.data('track-id');
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

    $.subscribe('show_lyrics', hideSearchContainer);

    $('#searchInput').focus();
  });
})(window.jQuery);




