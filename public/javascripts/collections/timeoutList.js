/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Timeout Data Collection
    // -----------------------

    var TimeoutList = Backbone.Collection.extend({
        model: app.Timeout,

        pauseAll : function() {
            this.each(function(timeout) {
                timeout.pause();
            });
        },

        playAll : function(current) {
            this.each(function(timeout) {
                timeout.play(current);
            });
        }

    });
    app.TimeoutList = new TimeoutList();
});
