#define PI 3.1415926535897932384626433832795

uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 fragPos;
varying vec3 camPos;
varying float vNoise;
varying float vDisplace;


void main()
{
		vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
		gl_Position = projectionMatrix * mvPosition;
    	vUv = uv;
}