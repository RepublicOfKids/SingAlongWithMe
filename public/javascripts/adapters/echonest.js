/*global Backbone _ $ ENTER_KEY */
var app = app || {};

/*****************
 Constants
 *****************/

var ECHONEST_API_KEY      = 'DXSCDJZB0VMRMKUTG';

/*****************
 Functions
 *****************/

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
