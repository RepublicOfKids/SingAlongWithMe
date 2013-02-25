;(function($) {
  "use strict";

  Room = function(sessionID, token, times, lyrics) {
    this.sessionID = sessionID;
    this.token = token;
    this.maxSeats = 4;
    this.currentSeats = 0;
    this.playlist = [];
    this.times = times;
    this.lyrics = lyrics;
    this.currentTimestamp = null;
    this.currentLyric = null;
  };

  Room.prototype = {

  };

})(window.jQuery);
