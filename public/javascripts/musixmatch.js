/*global Backbone _ $ ENTER_KEY */
var app = app || {};

/*****************
 Constants
 *****************/

var MUSIXMATCH_SEARCH_KEY = '82be3ea3f79ea404d45f47607c103eff';
var ECHONEST_API_KEY      = 'DXSCDJZB0VMRMKUTG';

/*****************
 Objects
 *****************/

function lrcData(times,lyrics) {
    this.times  = times;
    this.lyrics = lyrics;
}

/*****************
 Functions
 *****************/

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
  It is possible for the subtitle body to be undefined even though we applied a filter
  on the search call to filter for songs that only contain subtitles.
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

/*
  Returns two ordered arrays of timestamp data with their corresponding
  lines of lyrics in another array.
 */
function parseLrcData(json) {
    // Assumes subtitleBody contains newlines
    var subtitleBody = json.message.body.subtitle.subtitle_body;
    var subtitles    = subtitleBody.split("\n");
    var times        = [];
    var lyrics       = [];


    if (typeof subtitleBody === 'undefined' || !subtitleBody.length) {
      lyrics.push("Unfortunately we're not authorized to show these lyrics.");
    } else {
      for (var i=0; i < subtitles.length; i++) {
          var re       = /\[(\d+):(\d+).(\d+)\](.*)/i,
              matches  = subtitles[i].match(re),
              mins     = parseInt(matches[1].trim(), 10)*60*1000,
              secs     = parseInt(matches[2].trim(), 10)*1000,
              millis   = parseInt(matches[3].trim(), 10),
              timeInMs = mins+secs+millis,
              lyric    = matches[4].trim();

          if (i === 0 && timeInMs !== 0) {
            app.LyricDataList.add({'time': 0, 'lyric': "♫ ♫ ♫"});
          }

          app.LyricDataList.add({'time': timeInMs, 'lyric': lyric || "♫ ♫ ♫"});
      }
    }

    $.publish('show_lyrics');
}


/*
  Get song qualities from echonest
*/
function echonestGetAudioSummary(trackId, fn) {
  var params = {
    api_key: ECHONEST_API_KEY,
    format: "json",
    results: "1",
    id: "musixmatch-WW:song:" + trackId,
    bucket: "audio_summary"
  };

  $.getJSON('http://developer.echonest.com/api/v4/song/profile?', params,
      function(data) {
        if (data.response.songs) {
          window.audioSummary = data.response.songs[0].audio_summary;
        } else {
          window.audioSummary = null;
        }
        if (typeof fn === 'function') {
          fn();
        }
      });
}
