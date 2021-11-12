uniform float uTime;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 fragPos;
varying vec3 camPos;
varying float vNoise;



float N21(vec2 p){
    return fract(sin(p.x * 100.0 + p.y * 9517.0) * 45875.0);
}



void main()
{
    float noise = N21(vUv);

    vec2 c = fract(vUv * 10.0);
    vec2 id = floor(vUv * 10.0);
    c = c * c * (3.0 - 2.0 * c);

    float bl = N21(id);
    float br = N21(id + vec2(1.0, 0.0));
    float b = mix(bl, br, vUv.x);

    float tl = N21(id + vec2(0.0, 1.0));
    float tr = N21(id + + vec2(1.0, 1.0));
    float t = mix(tl, tr, c.x);

    float x = mix(b, t, c.y);


    vec3 lightColor = vec3(1.0,1.0,1.0);
    vec3 objectColor = vec3(1.0,1.0,1.0);
    vec3 lightPos = vec3(0.0,0.0,20.0);

    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;



    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(lightPos - fragPos);  

    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;


    float specularStrength = 0.5;

    vec3 viewDir = normalize(camPos - fragPos);
    vec3 reflectDir = reflect(-lightDir, norm);  

    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * lightColor; 

    vec3 X = dFdx(fragPos);
    vec3 Y = dFdy(fragPos);
    vec3 n = normalize(cross(X, Y));

    vec3 prod = clamp(cross(n, lightPos), 0.0, 1.0);

    vec3 result = (ambient + diffuse + specular) * objectColor;

    vec3 color = vec3(ambient + noise + prod.x) * objectColor;

    vec3 color1 = vec3(1.0);


    gl_FragColor = vec4(color, 1.0);

}