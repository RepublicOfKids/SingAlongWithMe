/*global Backbone _ $ ENTER_KEY Hogan*/
var app = app || {};

$(function () {
    "use strict";

    // Lyrics Container View
    // ---------------------

    app.LyricsContainerView = Backbone.View.extend({

        tagName : 'div',

        el : '#lyricsContainer',

        template : Hogan.compile($('#lyricTemplate').html()),

        initialize : function() {
            $.subscribe('show_lyrics', this.render.bind(this));
        },

        render : function() {
            window.timeoutsArray = [];
            this.populate_container_with_lyrics();
            this.unhide_container();
            return this;
        },

        populate_container_with_lyrics : function() {
            for (var i = 0; i < app.LyricDataList.length; i++) {
                this.$el.append(this.template.render({
                    lyric     : app.LyricDataList.at(i).get('lyric'),
                    timestamp : app.LyricDataList.at(i).get('time'),
                    i         : i
              }));
              window.setTimeoutEvents(app.LyricDataList.at(i).get('time'), window.timeoutsArray, i);
            }
        },

        unhide_container : function() {
          this.$el.removeClass('hidden');
        }

    });
});
