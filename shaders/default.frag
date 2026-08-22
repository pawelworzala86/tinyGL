precision mediump float;

varying vec3 vNormal;

uniform vec3 lightDir;

void main(void) {
    vec3 N = normalize(vNormal);
    vec3 L = normalize(-lightDir);

    vec3 baseColor = vec3(0.5);

    float diffuse = max(dot(N, L), 0.0);

    vec3 color = baseColor * diffuse;

    gl_FragColor = vec4(color, 1.0);
}