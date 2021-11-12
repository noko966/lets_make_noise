uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 sUv;
uniform vec3 vLight;

uniform vec2 uMouse;
varying float vTrail;
varying vec3 FragPos;



void main()
{
    float pct = distance(uv - vec2(0.5),uMouse);
    pct = smoothstep(0.2, 0.4, pct);

    vec3 newPosition = position;
    newPosition.z += 1.0 - pct;

    vec3 norm = normal;

    norm.y = pct;
	vec4 modelPosition = modelViewMatrix * vec4( newPosition, 1.0 );
    gl_Position = projectionMatrix * modelPosition;

    FragPos = modelPosition.xyz;

    vUv = uv;
    vTrail = pct;
    vNormal = norm;

}