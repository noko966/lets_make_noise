uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec2 sUv;
uniform vec3 vLight;
uniform vec2 uMouse;

varying float vTrail;
varying vec3 FragPos;
uniform sampler2D pallete;








void main()
{

    vec3 objectColor = vec3(0.5, 0.0, 0.0);

    vec3 lightColor = vec3(1.0, 1.0, 1.0);

    vec3 lightPos = vec3(1.0, 1.0, 1.0);

    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;



    // float pct = distance(vUv - vec2(0.5),uMouse);

    // pct = smoothstep(0.2, 0.5, pct);

    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(lightPos - FragPos);  
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;


	vec4 texture = texture2D( pallete, vUv );


    vec3 result = (ambient + diffuse) * objectColor;

    vec4 img = texture * result.r;


    gl_FragColor = vec4(result, 1.0);
    // gl_FragColor = img;


}