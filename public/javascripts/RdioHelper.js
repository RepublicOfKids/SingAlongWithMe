
;(function($) {

  RdioHelper = function() {};

  RdioHelper.prototype = {

    search: function(query, callback) {
      R.request({
        method: "search",
        content: {
          types: "Track",
          query: query
        },
        success: function(response) {
          if (response.status === 'ok' && typeof callback === 'function') {
            window.searchResults = response.results;
            return callback.call(this, response);
          }
        },
        error: function(response) {
          console.log("error");
        }
      });
    }

  }

})(window.jQuery);
