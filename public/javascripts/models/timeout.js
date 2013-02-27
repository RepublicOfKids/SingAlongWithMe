/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Timeout Data Model
    // -----------------

    app.Timeout = Backbone.Model.extend({
        defaults : {
            id             : null,
            callback       : null,
            originalDelay  : null,
            remainingDelay : null
        },

        initialize : function(callback, originalDelay) {
            this.callback      = callback;
            this.originalDelay = originalDelay;
        },

        pause : function() {
            window.clearTimeout(this.id);
        },

        play : function(current) {
            this.remainingDelay = this.originalDelay - current;
            this.id             = window.setTimeout(this.callback, this.remainingDelay);
        }
    });

});
