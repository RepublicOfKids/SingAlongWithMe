var MUSIXMATCH_SEARCH_KEY = '82be3ea3f79ea404d45f47607c103eff';

/*
  Return the subtitle of a track given the musixmatch track id.
  Subtitle here refers to the LRC data – timestamped lyrics data.

  URL: http://en.wikipedia.org/wiki/LRC_(file_format)
 */
function musixmatchGetLrcSubtitle(trackId, fn) {
    var params = {
      track_id        : trackId,
      format          : 'jsonp',
      apikey          : MUSIXMATCH_SEARCH_KEY,
      subtitle_format : 'lrc'
    };

    $.ajax({
      type       : "POST",
      dataType   : "jsonp",
      url        : "http://api.musixmatch.com/ws/1.1/track.subtitle.get",
      data       : params,
    }).done(
      function(json){
        if (typeof fn === 'function') {
          fn(json);
        }
      }
   );
}

/*
  Perform a callback function on track_id corresponding to search query (if found).
 */
function musixmatchGetTrackId(query, numResults, fn) {
    var params = {
      q              : query,
      f_has_lyrics   : 1,
      f_has_subtitle : 1,
      apikey         : MUSIXMATCH_SEARCH_KEY,
      page_size      : numResults,
      format         : 'jsonp'
    };

    $.ajax({
      type       : "POST",
      dataType   : "jsonp",
      url        : "http://api.musixmatch.com/ws/1.1/track.search",
      data       : params,
    }).done(
      function(json){
        var musixData = [],
            track_list = json.message.body.track_list;
        for (var i = 0; i < track_list.length; i++) {
          musixData.push({
            track  : track_list[i].track.track_name,
            album  : track_list[i].track.album_name,
            artist : track_list[i].track.artist_name,
            key    : track_list[i].track.track_id
          });
        }
        window.musixmatchData = musixData;
        if (typeof fn === 'function') {
          fn();
        }
      }
   );
}
