/*global Backbone _ $ ENTER_KEY */
var app = app || {};

;(function($) {
    "use strict";

    app.EchonestAdapter = function(){};

    app.EchonestAdapter.prototype = {

        ECHONEST_API_KEY : 'DXSCDJZB0VMRMKUTG',

        getAudioSummary : function(trackId) {
            var params = {
                api_key: this.ECHONEST_API_KEY,
                format: "json",
                results: "1",
                id: "musixmatch-WW:song:" + trackId,
                bucket: "audio_summary"
            };

            $.getJSON('http://developer.echonest.com/api/v4/song/profile?', params,
                function(data) {
                    if (data.response.songs) {
                        var audioSummary = data.response.songs[0].audio_summary;
                        app.echonestMood.setMood(audioSummary.energy, audioSummary.loudness, audioSummary.danceability, audioSummary.tempo);
                    } else {
                        app.echonestMood.ready();
                    }
                }
            );
        }
    };

})(window.jQuery);
