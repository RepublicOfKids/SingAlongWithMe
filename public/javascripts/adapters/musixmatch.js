/*global Backbone _ $ ENTER_KEY */
var app = app || {};

;(function($) {
    "use strict";

    app.MusixMatchAdapter = function(){};

    app.MusixMatchAdapter.prototype = {

        MUSIXMATCH_SEARCH_KEY : '82be3ea3f79ea404d45f47607c103eff',

        /*
        Returns two ordered arrays of timestamp data with their corresponding
        lines of lyrics in another array.
        */
        parseLrcData : function(json) {
            // Assumes subtitleBody contains newlines
            var subtitleBody = json.message.body.subtitle.subtitle_body;
            var subtitles    = subtitleBody.split("\n");
            var times        = [];
            var lyrics       = [];

            if (typeof subtitleBody === 'undefined' || !subtitleBody.length) {
                lyrics.push("Unfortunately we're not authorized to show these lyrics.");
            } else {
                var lyricsCount = 0;
                for (var i = 0; i < subtitles.length; i++) {
                    var re       = /\[(\d+):(\d+).(\d+)\](.*)/i,
                        matches  = subtitles[i].match(re),
                        mins     = parseInt(matches[1].trim(), 10)*60*1000,
                        secs     = parseInt(matches[2].trim(), 10)*1000,
                        millis   = parseInt(matches[3].trim(), 10),
                        timeInMs = mins+secs+millis,
                        lyric    = matches[4].trim();

                    if (i === 0 && timeInMs !== 0) {
                        app.LyricDataList.add({'time': 0, 'lyric': "♫ ♫ ♫"});
                        app.TimeoutList.push(new app.Timeout(app.LyricsContainer.highlightLyric.bind(this, timeInMs, lyricsCount), timeInMs));
                        ++lyricsCount;
                    }

                    app.LyricDataList.add({'time': timeInMs, 'lyric': lyric || "♫ ♫ ♫"});
                    app.TimeoutList.push(new app.Timeout(app.LyricsContainer.highlightLyric.bind(this, timeInMs, lyricsCount), timeInMs));
                    ++lyricsCount;
                }
            }

            $.publish('show_lyrics');
            $.publish('play_song');
        },

        /*
          Return the subtitle of a track given the musixmatch track id.
          Subtitle here refers to the LRC data – timestamped lyrics data.

          URL: http://en.wikipedia.org/wiki/LRC_(file_format)
        */
        getLrcSubtitle : function(trackId, fn) {
            var url = "http://api.musixmatch.com/ws/1.1/track.subtitle.get",
                params = {
                track_id        : trackId,
                apikey          : this.MUSIXMATCH_SEARCH_KEY,
                format          : 'jsonp',
                subtitle_format : 'lrc'
            };

            $.ajax({
                type       : "POST",
                dataType   : "jsonp",
                url        : url,
                data       : params,
            }).done(
                function(json){
                    if (typeof fn === 'function') {
                        fn(json);
                    }
                }
            );
        },

        /*
          Perform a callback function on track_id corresponding to search query (if found).
          It is possible for the subtitle body to be undefined even though we applied a filter on the search call to filter for songs that only contain subtitles.
        */
        getTrackId : function(query, numResults, fn) {
            var deferred,
                params = {
                q              : query,
                f_has_lyrics   : 1,
                f_has_subtitle : 1,
                apikey         : this.MUSIXMATCH_SEARCH_KEY,
                page_size      : numResults,
                format         : 'jsonp'
            };

            deferred = $.ajax({
                type       : "POST",
                dataType   : "jsonp",
                url        : "http://api.musixmatch.com/ws/1.1/track.search",
                data       : params,
            }).done(function(json){
                var musixData = [],
                    track_list = json.message.body.track_list;
                for (var i = 0; i < track_list.length; i++) {
                    musixData.push({
                        track  : track_list[i].track.track_name,
                        album  : track_list[i].track.album_name,
                        artist : track_list[i].track.artist_name,
                        key    : track_list[i].track.track_id
                    });
                }
                window.musixmatchData = musixData;
                if (typeof fn === 'function') {
                    fn();
                }
            });

            return deferred;
        }
    };

})(window.jQuery);
