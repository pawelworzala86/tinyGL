attribute vec3 position;
attribute vec4 normal;
attribute vec3 tangent;
attribute vec2 texcoord_0;

uniform mat4 perspective;
uniform mat4 camera;
uniform mat4 model;

void main(void) {
    gl_Position = perspective*camera*model*vec4(position, 1.0);
}