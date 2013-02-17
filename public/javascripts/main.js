;(function($) {
  "use strict";

  /*
  var socket = io.connect(window.location.href);
  // on connection to server, ask for user's name with an anonymous callback
  socket.on('connect', function(){
	  // call the server-side function 'adduser' and send one parameter (value of prompt)
	  socket.emit('adduser', prompt("Who are you?"));
      });

  // listener, whenever the server emits 'updatechat', this updates the chat body
  socket.on('updateroom', function (username, data) {
	  $('#conversation').append('<b>'+username + ':</b> ' + data + '<br>');
      });

  // listener, whenever the server emits 'updateusers', this updates the username list
  socket.on('updateusers', function(data) {
	  $('#users').empty();
	  $.each(data, function(key, value) {
		  $('#users').append('<div>' + key + '</div>');
	      });
	  //$('#users').html('<div>Total Users: ' + Object.keys(data).length + '</div>');
      });

  TODO: Add to jade file
  #div(style='float: left; width: 100px; border-right: 1px solid black; height: 300px; padding: 10px; overflow: scroll-y;')
    b USERS
    #users

  */

  var Rdio   = {};
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
      $("#rdioResultsContainer").html(resultsHtml).removeClass('hidden');
      //$("#rdioResultsContainer").show(1200);
    };

    var computeMoodBg = function() {
      console.log(window.audioSummary);
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
            "gl_FragColor = vec4(p.x, p.y, (1.+cos(p.x+time/1000.))/2., 1.0);\n" +
            "}",
        variables: {
          time: 0 // The time in ms
        },
        update: function (time) {
          this.set("time", time);
        }
      }).start();
    };

    var hideSearchContainer = function() {
      $('h1').addClass('hidden');
      $('#searchContainer').addClass('hidden');
    };

    var renderLyrics = function() {
      if(lrcDataPoints.lyrics.length === 1 && lrcDataPoints.times.length === 0) {
	      $("#rdioResultsContainer").html('<p>'+lrcDataPoints.lyrics[0]+'</p>');
	      return;
	    } else {
        var lyricTemplate = $('#lyricTemplate').html(),
            lyricsContainer = $('#lyricsContainer');
        window.timeoutsArray = [];

        hideSearchContainer();

        for (var i = 0; i < lrcDataPoints.times.length; i++) {
          lyricsContainer.append(Hogan.compile(lyricTemplate).render({
            lyric     : lrcDataPoints.lyrics[i],
            timestamp : lrcDataPoints.times[i],
            i         : i
          }));
          setTimeoutEvents(lrcDataPoints.times[i], window.timeoutsArray, i);
        }

        lyricsContainer.removeClass('hidden');
        renderTokbox();
      }
    };

    var renderTokbox = function() {
      TB.setLogLevel(TB.DEBUG); // Set this for helpful debugging messages in console
      window.session = TB.initSession(TOKBOX_SESSION_ID);
      session.addEventListener('sessionConnected', sessionConnectedHandler);
      session.addEventListener('streamCreated', streamCreatedHandler);
      session.connect(TOKBOX_API_KEY, TOKBOX_TOKEN);
    };

    var setTimeoutEvents = function(delay, timeoutsArray, i) {
      timeoutsArray.push(window.setTimeout(function() {
        $('.highlight-lyric').removeClass('highlight-lyric');
        $("#lyricsContainer").find("[data-time='" + delay + "']").addClass('highlight-lyric');
        $('#lyricsContainer').scrollTop(36 * i);
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

    $.subscribe('show_lyrics', renderLyrics);

    $('#searchInput').focus();
  });
})(window.jQuery);




