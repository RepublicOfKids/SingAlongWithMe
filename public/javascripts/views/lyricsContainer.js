/*global Backbone _ $ ENTER_KEY Hogan*/
var app = app || {};

$(function () {
    "use strict";

    // Lyrics Container View
    // ---------------------

    var LyricsContainerView = Backbone.View.extend({

        tagName : 'div',

        el : '#lyricsContainer',

        template : Hogan.compile($('#lyricTemplate').html()),

        initialize : function() {
            $.subscribe('show_lyrics', this.render.bind(this));
        },

        render : function() {
            window.timeoutsArray = [];
            this.populateContainerWithLyrics();
            this.unhideContainer();
            return this;
        },

        populateContainerWithLyrics : function() {
            for (var i = 0; i < app.LyricDataList.length; i++) {
                this.$el.append(this.template.render({
                    lyric     : app.LyricDataList.at(i).get('lyric'),
                    timestamp : app.LyricDataList.at(i).get('time'),
                    i         : i
                }));
            }
        },

        unhideContainer : function() {
          this.$el.removeClass('hidden');
        },

        highlightLyric : function(timeInMs, lyricsCount) {
            $('.highlight-lyric').removeClass('highlight-lyric');
            $("#lyricsContainer").find("[data-time='" + timeInMs + "']").addClass('highlight-lyric');
            $('#lyricsContainer').scrollTop(36 * lyricsCount);
        }

    });
    app.LyricsContainer = new LyricsContainerView();

});
