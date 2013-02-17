var Rdio = {};

;(function($) {
	R.ready(function() {
		Rdio = new RdioHelper();
		
		$("#goButton").on("click", function () {
			var query = $("#searchInput").val();
			Rdio.search(query, renderRdioResults);
			//TODO: Update numResults and fn
			//musixmatchGetTrackId(query, numResults, fn);
		    });
	    });
})(window.jQuery);

function renderRdioResults() {
    var songs = window.searchResults.results;
    if(songs.length === 0) {
	$("#rdioResultsContainer").html('<p>Sorry, no results found.</p>')
	    return;
    }
    
    var resultsHtml = '';
    for (var i = 0; i < songs.length; i++){
	resultsHtml = resultsHtml + '<li>Song Title: ' + songs[i].name + ', Album Name: ' + songs[i].album + '</li>';
    }
    
    $("#rdioResultsContainer").html(resultsHtml);
}


