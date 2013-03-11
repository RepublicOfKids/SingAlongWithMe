/*global Backbone _ $ ENTER_KEY Hogan*/
var app = app || {};

$(function () {
    "use strict";

    // Search Results View
    // -------------------

    var SearchResultsView = Backbone.View.extend({

        tagName : 'ul',

        el : '#searchResultsContainer',

        template : Hogan.compile($('#searchResultTemplate').html()),

        initialize : function() {
            $.subscribe('show_lyrics', this.hide.bind(this));
            $.subscribe('create room', this.hide.bind(this));
            this.listenTo(app.searchResultsList, 'add_results', this.render.bind(this));
        },

        render : function(songs) {
            this.empty();
            this.$el.append(this.template.render({songs: app.searchResultsList.toJSON()}));
            this.show();
        },

        empty : function() {
            this.$el.html("");
        },

        hide : function() {
            this.$el.addClass('hidden');
        },

        show : function() {
            this.$el.removeClass('hidden');
        }
    });

    app.searchResultsContainer = new SearchResultsView();

});
