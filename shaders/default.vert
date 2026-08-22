attribute vec3 position;
attribute vec3 color;

uniform mat4 perspective;
uniform mat4 camera;
uniform mat4 model;

varying vec3 vColor;

void main(void) {
    gl_Position = perspective*camera*model*vec4(position, 1.);
    vColor = color;
}