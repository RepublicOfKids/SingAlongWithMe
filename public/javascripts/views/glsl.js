/*global Backbone _ $ ENTER_KEY Glsl Hogan*/
var app = app || {};

$(function () {
    "use strict";

    // GLSL View
    // ---------

    var GLSLView = Backbone.View.extend({

        tagName : 'div',

        el : '#viewport',

        initialize : function() {
            this.listenTo(app.echonestMood, 'ready', this.render.bind(this));
        },

        render : function() {
            if (!this.supported()) { return ; }
            this.showGLSL();
            if (this.danceability > 0.75) {
                this.showPsy();
            }
        },

        supported : function() {
            return !!Glsl.supported();
        },

        showPsy : function() {
            $("#psyContainer").show();
        },

        showGLSL : function() {
            var glsl = Glsl({
                canvas: document.getElementById("viewport"),
                fragment:
                   "#ifdef GL_ES\n" +
                    "precision mediump float;\n" +
                    "#endif\n" +
                    "uniform float time;\n" +
                    "uniform vec2 resolution;\n" +
                    "void main (void) {\n" +
                    "vec2 p = ( gl_FragCoord.xy / resolution.xy );\n" +
                    "gl_FragColor = vec4(0.9 * (p.x * " + app.echonestMood.get('energyCoef1') + " + " + app.echonestMood.get('energyCoef2') + " * (1.+cos(time/"+ app.echonestMood.get('speedCoef') +
                    "))/2.), 0.9 * (p.y * " + app.echonestMood.get('energyCoef1') + " + " + app.echonestMood.get('energyCoef2') + " * (1.+cos(time/"+ app.echonestMood.get('speedCoef') +
                    "))/2.), (1.+cos(time/"+ app.echonestMood.get('speedCoef') +
                    "))/2., " + app.echonestMood.get('loudnessCoef') + ");\n" +
                    "}",
                variables: {
                    time: 0 // The time in ms
                },
                update: function (time) {
                    this.set("time", time);
                }
            }).start();
        }
    });

    app.glsl = new GLSLView();

});
