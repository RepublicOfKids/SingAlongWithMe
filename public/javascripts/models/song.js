/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Song Model
    // ----------

    app.Song = Backbone.Model.extend({

        defaults : {
          rdioPlaybackKey : null,
          musixTrackId : null
        },

        initialize : function(rdioPlaybackKey, musixTrackId) {
          this.set({
            rdioPlaybackKey: rdioPlaybackKey,
            musixTrackId: musixTrackId
          });
        }

    });

});
