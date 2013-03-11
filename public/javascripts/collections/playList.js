/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // PlayList Collection
    // ----------------------

    var PlayList = Backbone.Collection.extend({

        model: app.Song

    });

    app.PlayList = new PlayList();

});
