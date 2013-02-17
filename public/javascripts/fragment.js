#ifdef GL_ES
precision mediump float;
#endif
uniform float time;
uniform vec2 resolution;

void main (void) {
  vec2 p = ( gl_FragCoord.xy / resolution.xy );
  gl_FragColor = vec4(p.x, p.y, (1.+cos(time/1000.))/2., 1.0);
}
