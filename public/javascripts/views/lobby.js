/*global Backbone _ $ ENTER_KEY Lobby Hogan*/
var app = app || {};

$(function () {
    "use strict";

    // Lobby View
    // ---------
    app.LobbyView = Backbone.View.extend({

        tagName : 'div',

        el      : '#lobbyContainer',

        events  : {
            'click .partyButton' : "partyOn"
        },

        initialize : function() {
            socket.on('created roomId', this.render.bind(this));
        },

        render : function(roomId) {
            this.$el.find("#roomId").html(roomId);
            this.$el.removeClass("hidden");
        },

        partyOn : function() {
            this.hide();
            $.publish('fetch_lyrics');
        },

        hide : function() {
            this.$el.addClass('hidden');
        }
    });
});
