uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 fragPos;
varying vec3 camPos;
varying float vNoise;
varying float vDisplace;

uniform sampler2D pallete;

void main()
{
    vec2 stripPos = vec2( 0.0, vDisplace );
	vec4 stripColor = texture2D( pallete, stripPos );
	stripColor *= pow(1.0-vDisplace, 1.0);
	gl_FragColor = stripColor;
}