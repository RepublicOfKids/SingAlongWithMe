/*global Backbone _ $ ENTER_KEY Hogan R*/
var app = app || {};

;(function($) {
    "use strict";

    app.RdioHelper = function(){};

    app.RdioHelper.prototype = {

        search: function(query, callback) {
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
              }
            },
            error: function(response) {
                console.log("error");
            }});
        },

        play: function(key) {
            R.player.play({source: key});
        },

        pause: function() {
            R.player.pause();
        },

        togglePause : function() {
            R.player.togglePause();
        }

    };

})(window.jQuery);
