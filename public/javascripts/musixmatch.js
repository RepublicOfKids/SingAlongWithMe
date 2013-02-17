var MUSIXMATCH_SEARCH_KEY = '82be3ea3f79ea404d45f47607c103eff';
var ECHONEST_API_KEY = 'DXSCDJZB0VMRMKUTG';

/*
  Return the subtitle of a track given the musixmatch track id. 
  Subtitle here refers to the LRC data – timestamped lyrics data.

  URL: http://en.wikipedia.org/wiki/LRC_(file_format)
 */
function musixmatchGetLrcSubtitle(trackId) {
    var params = {
	track_id        : trackId
	formatDecide    : 'json',
	subtitle_format : 'lrc'
    };
    
    $.getJSON('http://api.musixmatch.com/ws/1.1/track.search?', params,
	      function(data) {
		  var trackId = data['message']['body']['track_list']['track']['track_id'][0].message;
		  alert(trackId);
	      });
    
}

/*
  Return track_id corresponding to search query.
 */
function musixmatchGetTrackId(query) {
    var params = {
	q              : query,
	f_has_lyrics   : 1,
	f_has_subtitle : 1,
	apikey         : MUSIXMATCH_SEARCH_KEY,
	page_size      : 1,
	format         : 'json'
    };

    $.getJSON('http://api.musixmatch.com/ws/1.1/track.search?', params,
	      function(data) {
		  var trackId = data['message']['body']['track_list']['track']['track_id'][0].message;
		  alert(trackId);
	      });

}

/*
  Get song qualities from echonest
*/
function echonestGetAudioSummary(trackId) {
  var params = {
    api_key: ECHONEST_API_KEY,
    format: "json",
    results: "1",
    id: "musixmatch-WW:song:" + trackId,
    bucket: "audio_summary"
  };
  
  $.getJSON('http://developer.echonest.com/api/v4/song/profile?', params,
      function(data) {
	      console.log(data);
      });

}