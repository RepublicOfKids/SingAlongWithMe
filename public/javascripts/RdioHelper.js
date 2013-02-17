
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
          if (response.status === 'ok') {
            window.searchResults = response.results;
            if (typeof callback === 'function') {
              return callback.call(this, response);
            }
          }
        },
        error: function(response) {
          console.log("error");
        }
      });
    }

  }

})(window.jQuery);
