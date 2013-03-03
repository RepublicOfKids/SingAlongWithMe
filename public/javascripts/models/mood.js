/*global Backbone _ $ ENTER_KEY */
var app = app || {};

$(function () {
    "use strict";

    // Mood Data Model
    // ---------------

    app.Mood = Backbone.Model.extend({

        defaults : {
            speedCoef        : 800 + '.',
            energyCoef1      : 0.5,
            energyCoef2      : 0.5,
            loudnessCoef     : 0.6,
            engery           : null,
            loudness         : null,
            danceability     : null,
            tempo            : null
        },

        setMood : function(energy, loudness, danceability, tempo) {
            this.set({
                energy       : energy || null,
                loudness     : loudness || null,
                danceability : danceability || null,
                tempo        : tempo || null,
                energyCoef1  : energy ? energy : this.get('energyCoef1'),
                energyCoef2  : energy ? this.mapNumberRanges(0, 1, 1, 0, energy) : this.get('energyCoef2'),
                loudnessCoef : loudness ? this.mapNumberRanges(-16, -2, 0, 1, loudness) : this.get('loudnessCoef')
            });
            this.ready();
        },

        ready : function() {
            this.trigger('ready');
        },

        mapNumberRanges : function(min1, max1, min2, max2, input) {
            return ((input - min1) / (max1 - min1)) * (max2 - min2) + min2;
        }

    });

    app.echonestMood = new app.Mood();

});
