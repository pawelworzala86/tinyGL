#version 300 es
precision mediump float;

uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;

in vec3 vNormal;

out vec4 outColor;

void main(void) {
    vec3 normal = normalize(vNormal);
    
    float light = dot(normal, u_reverseLightDirection);
    
    outColor = u_color;
    
    // Lets multiply just the color portion (not the alpha)
    // by the light
    outColor.rgb *= light;
}