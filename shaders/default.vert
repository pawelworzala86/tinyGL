#version 300 es

in vec3 position;
in vec3 normal;
in vec3 tangent;
in vec2 texcoord_0;

uniform mat4 perspective;
uniform mat4 camera;
uniform mat4 model;

out vec3 vNormal;

void main(void) {
    gl_Position = perspective*camera*model*vec4(position, 1.0);

    vNormal = normal;
}