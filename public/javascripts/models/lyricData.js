/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Lyrics Data Model
    // -----------------

    app.LyricData = Backbone.Model.extend({

        defaults : {
            time : '',
            lyric : ''
        }

    });

});
