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

	vec3 sunColorA = vec3(0.416,0.4,0.639);
	vec3 sunColorB = vec3(0.067,0.067,0.067);
	// vec3 sunColorB = vec3(0.0);

	vec2 nUv = vUv;
	nUv.y = nUv.y / 0.5;

	float st = fract(nUv.y * 8.0);
	float id = floor(nUv.y * 8.0);
	st = step(1.5 - (id * 0.1) * sin(uTime), st);
	vec3 color = vec3(st);

	// vec3 transparency = st;

	color = mix(sunColorB, sunColorA, st);

	gl_FragColor = vec4(color, 1.0);
}