/*global Backbone _ $ ENTER_KEY Hogan*/
var app = app || {};

$(function () {
    "use strict";

    // Lyrics Container View
    // ---------------------

    var SearchResultsView = Backbone.View.extend({

        tagName : 'ul',

        el : '#searchResultsContainer',

        template : Hogan.compile($('#searchResultTemplate').html()),

        render : function(songs) {
            this.empty();
            this.$el.append(this.template.render(songs));
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

    app.searchResults = new SearchResultsView();

});
