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
            this.set({
                callback : callback,
                originalDelay : originalDelay
            });
        },

        pause : function() {
            window.clearTimeout(this.get('id'));
        },

        play : function(current) {
            var remainingDelay = this.get('originalDelay') - current;
            this.set({
                remainingDelay : remainingDelay,
                id: window.setTimeout(this.get('callback'), remainingDelay)
            });
        }
    });

});
