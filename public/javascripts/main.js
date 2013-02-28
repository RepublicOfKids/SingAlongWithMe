/*global Backbone _ $ ENTER_KEY Hogan R Glsl*/
var app = app || {};

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

  R.ready(function() {
    app.rdio = new app.RdioAdapter();
    app.musixMatch = new app.MusixMatchAdapter();


    var searchForSong = function() {
      var query = $("#searchInput").val();
      app.musixMatch.getTrackId(query, 50, app.rdio.search.bind(this, query, renderSuggestions));
    };

    var renderSuggestions = function() {
      app.searchResultsList.addMatches(window.rdioData, window.musixmatchData);
      //app.searchResultsContainer.render(app.searchResultsList.toJSON);
      $('#credits').addClass('hidden');
    };

    var computeMoodBg = function() {
      console.log(window.audioSummary);

      var speedCoef    = 800 + ".";
      var energyCoef1  = 0.5;
      var energyCoef2  = 0.5;
      var loudnessCoef = 0.6;
      var danceability;

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
        danceability = audioSummary.danceability;
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

    var hideTitleScreen = function() {
      $('h1').addClass('hidden');
      $('#searchContainer').addClass('hidden');
    };

    // var renderTokbox = function() {
    //   TB.setLogLevel(TB.DEBUG); // Set this for helpful debugging messages in console
    //   window.session = TB.initSession(TOKBOX_SESSION_ID);
    //   session.addEventListener('sessionConnected', sessionConnectedHandler);
    //   session.addEventListener('streamCreated', streamCreatedHandler);
    //   session.connect(TOKBOX_API_KEY, TOKBOX_TOKEN);
    // };

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
      app.musixMatch.getLrcSubtitle(window.trackId, app.musixMatch.parseLrcData);
      echonestGetAudioSummary(window.trackId, computeMoodBg);
    });

    $('#rdioPlay').on('click', function() {
      app.rdio.togglePause();
    });

    $.subscribe('play_song', function() {
      app.rdio.play(window.playBackKey);
      $('#rdioPlayer').removeClass('hidden');
    });

    $.subscribe('show_lyrics', hideTitleScreen);

    $('#searchInput').focus();
  });
})(window.jQuery);




