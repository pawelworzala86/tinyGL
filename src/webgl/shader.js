//import { get } from "./../common.js"

const defualtVert = `
attribute vec3 position;

uniform mat4 Pmatrix;
uniform mat4 Vmatrix;
uniform mat4 Mmatrix;

attribute vec3 color;

varying vec3 vColor;

void main(void) {
    gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);
    vColor = color;
}
`
const defualtFrag = `
precision mediump float;

varying vec3 vColor;

void main(void) {
    gl_FragColor = vec4(vColor, 1.);
}
`

export class Shader{
    constructor(gl,program){
        this.gl = gl
        this.program = program
    }
    static createShader(gl,type,code){
        const shader = gl.createShader(type)
        gl.shaderSource(shader, code)
        gl.compileShader(shader)
        return shader
    }
    static async create(gl){
        const vertCode = defualtVert//await get('./shaders/default.vert')
        const fragCode = defualtFrag//await get('./shaders/default.frag')

        const vertShader = Shader.createShader(gl,gl.VERTEX_SHADER, vertCode)
        const fragShader = Shader.createShader(gl,gl.FRAGMENT_SHADER, fragCode)

        const program = gl.createProgram()
        gl.attachShader(program, vertShader)
        gl.attachShader(program, fragShader)
        gl.linkProgram(program)

        const shader = new Shader(gl,program)
        return shader
    }
}