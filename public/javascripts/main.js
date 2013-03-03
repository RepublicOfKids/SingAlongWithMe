/*global Backbone _ $ ENTER_KEY Hogan R Glsl io*/
var app = app || {};

;(function($) {
    "use strict";

    var socket = io.connect(window.location.href);
    // Connecting to server
    socket.on('connect', function(){
        socket.emit('addUser', window.prompt("Enter your name"));
    });

    // Updating the room
    socket.on('broadcastData', function (data) {
        window.alert(data);
    });

    R.ready(function() {
        app.rdio = new app.RdioAdapter();
        app.musixMatch = new app.MusixMatchAdapter();
        app.echonest = new app.EchonestAdapter();


        var searchForSong = function() {
            var query = $("#searchInput").val();
            app.musixMatch.getTrackId(query, 50, app.rdio.search.bind(this, query, renderSuggestions));
        };

        var renderSuggestions = function() {
            app.searchResultsList.addMatches(window.rdioData, window.musixmatchData);
            $('#credits').addClass('hidden');
        };

        var hideTitleScreen = function() {
            $('h1').addClass('hidden');
            $('#searchContainer').addClass('hidden');
        };

        var onSongSelect = function(event) {
            var $searchResult  = $(event.target);
            window.playBackKey = $searchResult.data('key');
            window.trackId     = $searchResult.data('track-id');
            app.musixMatch.getLrcSubtitle(window.trackId, app.musixMatch.parseLrcData);
            app.echonest.getAudioSummary(window.trackId);
        };


        /***** DOM EVENTS *****/

        $("#goButton").on("click", searchForSong);

        $("#searchInput").keypress(function(e) {
            if (e.which === 13) {
                searchForSong();
            }
        });

        $('body').on('click', '.list-search-result', onSongSelect.bind(this, event));

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




