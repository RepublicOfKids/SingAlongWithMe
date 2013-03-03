/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Search Result Collection
    // ------------------------

    var SearchResultsList = Backbone.Collection.extend({
        model: app.SearchResult,

        addMatches : function(a, b) {
            for (var i = 0; i < a.length; i++) {
                for (var j = 0; j < b.length; j++) {
                    if (a[i].track.toLowerCase() === b[j].track.toLowerCase() && a[i].artist.toLowerCase() === b[j].artist.toLowerCase() && a[i].album.toLowerCase() === b[j].album.toLowerCase()) {
                    this.push(new app.SearchResult(a[i].album, a[i].artist, a[i].key, a[i].track, b[j].key));
                    }
                }
            }
            this.trigger('add_results');
        }

    });

    app.searchResultsList = new SearchResultsList();
});
