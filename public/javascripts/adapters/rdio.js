/*global Backbone _ $ ENTER_KEY Hogan R*/
var app = app || {};

;(function($) {
    "use strict";

    app.RdioAdapter = function(){};

    app.RdioAdapter.prototype = {

        search: function(query, callback) {
            var deferred = $.Deferred();
            R.request({
                method: "search",
                content: {
                types: "Track",
                query: query,
                count: 50
            },
            success: function(response) {
                if (response.status === 'ok') {
                    var rdioData = [],
                        rdioResults = response.result.results;
                    for (var i=0; i < response.result.results.length; i++) {
                        rdioData.push({
                            track: rdioResults[i].name,
                            album: rdioResults[i].album,
                            artist: rdioResults[i].artist,
                            key: rdioResults[i].key
                    });
                }

                window.rdioData = rdioData;

                if (typeof callback === 'function') {
                    return callback.call(this, response);
                }

                return deferred.resolve(response);
              }
            },
            error: function(response) {
                console.log("error");
                deferred.resolve();
            }});

            return deferred;
        },

        play: function(key) {
            R.player.play({source: key});
            app.TimeoutList.playAll(R.player.position()*1000);
        },

        resume: function() {
            R.player.togglePause();
            app.TimeoutList.playAll(R.player.position()*1000);
        },

        pause: function() {
            R.player.pause();
            app.TimeoutList.pauseAll();
        },

        togglePause : function() {
            if (R.player.playState() === R.player.PLAYSTATE_PLAYING) {
                this.pause();
            } else if (R.player.playState() === R.player.PLAYSTATE_PAUSED) {
                this.resume();
            }
        }

    };

})(window.jQuery);
