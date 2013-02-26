/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Lyrics Data Collection
    // ----------------------

    var LyricDataList = Backbone.Collection.extend({

        model: app.LyricData

    });

    app.LyricDataList = new LyricDataList();

});
