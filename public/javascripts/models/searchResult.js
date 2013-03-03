/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Search Result Model
    // -------------------

    app.SearchResult = Backbone.Model.extend({

        defaults : {
            album       : '',
            artist      : '',
            key         : '',
            track       : '',
            track_id    : ''
        },

        initialize : function(album, artist, key, track, track_id) {
            this.set({
                album : album,
                artist : artist,
                key : key,
                track : track,
                track_id : track_id
            });
        }

    });

});
