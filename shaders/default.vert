attribute vec3 position;

uniform mat4 perspective;
uniform mat4 camera;
uniform mat4 model;

attribute vec3 color;

varying vec3 vColor;

void main(void) {
    gl_Position = perspective*camera*model*vec4(position, 1.);
    vColor = color;
}